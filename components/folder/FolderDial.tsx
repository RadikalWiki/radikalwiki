import React, { useState } from "react";
import { Avatar, Zoom } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  Add,
  LowPriority,
  GetApp,
  SupervisorAccount,
  Lock,
  LockOpen,
  ContentCopy,
} from "@mui/icons-material";
import { AddFolderDialog } from ".";
import { useRouter } from "next/router";
import { useSession } from "hooks";
import HTMLtoDOCX from "html-to-docx";

import {
  useMutation,
  Maybe,
  contents,
  authorships,
  useQuery,
  resolved,
  query as q,
  order_by,
} from "gql";

export default function FolderDial({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [session] = useSession();
  const [addDialog, setAddDialog] = useState(false);
  const query = useQuery();
  const folder = query.folders_by_pk({ id });
  const [updateFolder] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_folders_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [query.folders_by_pk({ id })],
    }
  );

  if (!session?.roles?.includes("admin")) return null;

  const formatContent = async (id: string, level: number): Promise<string> => {
    if (!id) return ""
    const children = await resolved(() => {
      return q
        .contents_by_pk({ id })
        ?.children()
        .map((content) => content.id);
    });
    const authors = await resolved(() => {
      return q
        .contents_by_pk({ id })
        ?.authors()
        ?.map((a) => a.identity?.displayName ?? a.name)
        .join(", ");
    });
    const content = await resolved(() => {
      const content = q.contents_by_pk({ id });
      if (content) return { name: content.name, data: content.data };
    });
    return `<h${level}>${
      content?.name
    }</h${level}><i>Stillet af: ${authors}</i>${content?.data}${
      children ? "<br>" + (await Promise.all(children.map(async (id) => (await formatContent(id, level + 1))))).join("<br>") : ""
    }`;
  };

  const handleExport = async () => {
    const contents = await resolved(() => {
      return q.folders_by_pk({ id: folder?.id })?.contents({
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

  const handleLockContent = async () => {
    const set = { lockContent: !folder?.lockContent };
    await updateFolder({
      args: { id: folder?.id, set },
    });
  };

  const handleLockChildren = async () => {
    const set = { lockChildren: !folder?.lockChildren };
    await updateFolder({
      args: { id: folder?.id, set },
    });
  };

  const childName =
    folder?.mode == "changes" ? "ændringsforslag" : "kandidaturer";

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
                {folder?.lockContent ? <LockOpen /> : <Lock />}
              </Avatar>
            }
            tooltipTitle={`${folder?.lockContent ? "Lås op" : "Lås"} indhold`}
            tooltipOpen
            onClick={handleLockContent}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                {folder?.lockChildren ? <LockOpen /> : <Lock />}
              </Avatar>
            }
            tooltipTitle={`${
              folder?.lockChildren ? "Lås op" : "Lås"
            } ${childName}`}
            tooltipOpen
            onClick={handleLockChildren}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <Add />
              </Avatar>
            }
            tooltipTitle="Mappe"
            tooltipOpen
            onClick={() => setAddDialog(true)}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <ContentCopy />
              </Avatar>
            }
            tooltipTitle="Kopier"
            tooltipOpen
            onClick={() => router.push(`/folder/${folder?.id}/copy`)}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <LowPriority />
              </Avatar>
            }
            tooltipTitle="Sorter"
            tooltipOpen
            onClick={() => router.push(`/folder/${folder?.id}/sort`)}
          />
          <SpeedDialAction
            icon={
              <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <GetApp />
              </Avatar>
            }
            tooltipTitle="Eksporter"
            tooltipOpen
            onClick={handleExport}
          />
        </SpeedDial>
      </Zoom>
      <AddFolderDialog
        folder={folder}
        open={addDialog}
        setOpen={setAddDialog}
      />
    </>
  );
}
