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
import { resolved, query as q } from "gql";
import { Node, useNode } from "hooks";
import { fromId } from "core/path";

export default function FolderDial({ node }: { node: Node }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const query = node.query;
  const parentId = query?.parentId;

  if (!query?.isContextOwner) return null;

  const formatContent = async (id: string, level: number): Promise<string> => {
    if (!id) return "";
    const children = await resolved(() => {
      return q
        .node({ id })
        ?.children()
        .map((content) => content.id);
    });
    const members = await resolved(() => {
      return q
        .node({ id })
        ?.members()
        ?.map((m) => m.name ?? m.user?.displayName)
        .join(", ");
    });
    const content = await resolved(() => {
      const content = q.node({ id });
      if (content) return { name: content.name, data: content.data };
    });
    return `<h${level}>${
      content?.name
    }</h${level}><i>Stillet af: ${members}</i>${content?.data}${
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

  /*
  const handleExport = async () => {
    const contents = await resolved(() => {
      return q.node({ id: folder?.id })?.children({
          order_by: [{ index: order_by.asc }],
          where: { parentId: { _is_null: true } },
        }).map(({ id }) => ({ id }))
    });
    const html = contents ? (await Promise.all(contents.map(async (content) => (await formatContent(content.id, 1))))).join("<br><br>") : "";

    const blob = await HTMLtoDOCX(html as string, "", {
      table: { row: { cantSplit: true } },
    });

    // Create and evoke link to file
    const blobUrl = URL.createObjectURL(blob as Blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${folder?.name} Eksport.docx`;
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
  */

  const handleDelete = async () => {
    await node.members.delete();
    await node.delete();
    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const handleLockChildren = async () => {
    await node.update({ set: { attachable: !query?.attachable } });
  };

  const handleLockContent = async () => {
    await node.update({ set: { mutable: !query?.mutable } });
  };

  return (
    <>
      <Zoom in={true}>
        <SpeedDial
          ariaLabel="Administrer mappe"
          sx={{
            position: "fixed",
            bottom: (t) => t.spacing(16),
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
          />
        </SpeedDial>
      </Zoom>
    </>
  );
}
