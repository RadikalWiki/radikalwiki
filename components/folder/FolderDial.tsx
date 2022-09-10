import React, { useState } from "react";
import { Avatar, Zoom } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  LowPriority,
  GetApp,
  SupervisorAccount,
  Lock,
  LockOpen,
  Delete,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { resolved, query as q, order_by } from "gql";
import { Node, useScreen } from "hooks";
import { fromId } from "core/path";
import HTMLtoDOCX from "html-to-docx";
import { toHtml } from "core/document";
import { getLetter } from "mime";

export default function FolderDial({ node }: { node: Node }) {
  const screen = useScreen();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const query = node.useQuery();
  const nodeUpdate = node.useUpdate();
  const nodeDelete = node.useDelete();
  const nodeMembers= node.useMembers();
  const parentId = query?.parentId;

  if (screen || !query?.isContextOwner) return null;

  const formatContent = async (id: string, level: number): Promise<string> => {
    if (!id) return "";
    const index =
      (
        await resolved(() =>
          q.node({ id })?.parent?.children({
            where: {
              _and: [
                { mutable: { _eq: false } },
                { mimeId: { _in: ["vote/change", "vote/policy"] } },
              ],
            },
            order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
          }).map(({ id }) => ({ id }))
        )
      )?.findIndex((e: any) => e.id === id) ?? 0;

    const children = await resolved(() => {
      return q
        .node({ id })
        ?.children({
          order_by: [{ index: order_by.asc }],
          where: {
            mimeId: {
              _in: [
                "vote/position",
                "vote/candidate",
                "vote/policy",
                "vote/change",
              ],
            },
          },
        })
        .map(({ id }) => id);
    });
    const members = await resolved(() => {
      return q
        .node({ id })
        ?.members()
        ?.map((m) => m.name ?? m.user?.displayName)
        .join(", ");
    });
    const node = await resolved(() => {
      const node = q.node({ id });
      if (node)
        return { name: node.name, data: node.data(), mimeId: node.mimeId };
    });

    const prefix =
      node?.mimeId == "vote/policy"
        ? `${getLetter(index)}: `
        : node?.mimeId == "vote/change"
        ? `${index + 1}: `
        : "";
    return `<h${level}>${prefix}${
      node?.name
    }</h${level}><i>Stillet af: ${members}</i>${toHtml(node?.data?.content)}${
      children
        ? "<br>" +
          (
            await Promise.all(
              children.map(async (id) => await formatContent(id, level + 1))
            )
          ).join("<br>")
        : ""
    }`;
  };

  const handleExport = async () => {
    const nodes = await resolved(() => {
      return q
        .node({ id: query?.id })
        ?.children({
          order_by: [{ index: order_by.asc }],
          where: {
            mimeId: {
              _in: [
                "vote/position",
                "vote/candidate",
                "vote/policy",
                "vote/change",
              ],
            },
          },
        })
        .map(({ id }) => ({ id }));
    });

    const html = nodes
      ? (
          await Promise.all(
            nodes.map(async (content) => await formatContent(content.id, 2))
          )
        ).join("<br><br>")
      : "";

    const blob = await HTMLtoDOCX(html as string, "", {
      table: { row: { cantSplit: true } },
    });

    // Create and evoke link to file
    const blobUrl = URL.createObjectURL(blob as Blob);
    const link = document.createElement("a");
    // eslint-disable-next-line functional/immutable-data
    link.href = blobUrl;
    // eslint-disable-next-line functional/immutable-data
    link.download = `${query?.name} Eksport.docx`;
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    await nodeMembers.delete();
    await nodeDelete();
    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const handleLockChildren = async () => {
    await nodeUpdate({ set: { attachable: !query?.attachable } });
  };

  const handleLockContent = async () => {
    await nodeUpdate({ set: { mutable: !query?.mutable } });
  };

  return (
    <>
      <Zoom in={true}>
        <SpeedDial
          ariaLabel="Administrer mappe"
          sx={{
            position: "fixed",
            bottom: (t) => t.spacing(17),
            right: (t) => t.spacing(3),
          }}
          icon={<SupervisorAccount />}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
        >
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                {<Delete />}
              </Avatar>
            }
            tooltipTitle="Slet"
            tooltipOpen
            onClick={handleDelete}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                {query?.attachable ? <Lock /> : <LockOpen />}
              </Avatar>
            }
            tooltipTitle={`${query?.attachable ? "Lås" : "Lås op"} indsend`}
            tooltipOpen
            onClick={handleLockChildren}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                {query?.mutable ? <Lock /> : <LockOpen />}
              </Avatar>
            }
            tooltipTitle={`${query?.mutable ? "Lås" : "Lås op"} indhold`}
            tooltipOpen
            onClick={handleLockContent}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                <LowPriority />
              </Avatar>
            }
            tooltipTitle="Sorter"
            tooltipOpen
            onClick={() => router.push(`${router.asPath}?app=sort`)}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                <GetApp />
              </Avatar>
            }
            tooltipTitle="Eksporter"
            tooltipOpen
            onClick={handleExport}
          />
        </SpeedDial>
      </Zoom>
    </>
  );
}
