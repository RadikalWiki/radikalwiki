import React, { useState } from "react";
import { Avatar, Zoom } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  LowPriority,
  GetApp,
  SupervisorAccount,
  Lock,
  LockOpen,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useMutation, useQuery, resolved, query as q } from "gql";

export default function FolderDial({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const query = useQuery();
  const folder = query.node({ id });
  const [updateFolder] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    { refetchQueries: [folder, query.node({ id: folder?.parentId })] }
  );

  if (!folder?.isContextOwner) return null;

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
          order_by: [{ priority: order_by.asc }],
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

  const handleLockContent = async () => {
    const set = { mutable: !folder?.mutable };
    await updateFolder({
      args: { id: folder?.id, set },
    });
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
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                {folder?.mutable ? <Lock /> : <LockOpen />}
              </Avatar>
            }
            tooltipTitle={`${folder?.mutable ? "Lås" : "Lås op"} indhold`}
            tooltipOpen
            onClick={handleLockContent}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <LowPriority />
              </Avatar>
            }
            tooltipTitle="Sorter"
            tooltipOpen
            onClick={() => router.push(`${router.asPath}?app=sort`)}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
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
