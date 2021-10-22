import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { SpeedDial, SpeedDialAction } from '@mui/material';
import {
  Add,
  LowPriority,
  GetApp,
  SupervisorAccount,
  Lock,
  LockOpen,
} from "@mui/icons-material";
import { AddFolderDialog } from ".";
import { useRouter } from "next/router";
import { useSession } from "hooks";
import HTMLtoDOCX from "html-to-docx";

import { useMutation, Maybe, contents, authorships, useQuery } from "gql";

export default function FolderDial({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [session] = useSession();
  const [addDialog, setAddDialog] = useState(false);
  const query = useQuery();
  const folder = query.folders_by_pk({ id });
  const [updateFolder] = useMutation(
    (mutation, args: { id: string, set: any }) => {
      return mutation.update_folders_by_pk({ pk_columns: { id: args.id }, _set: args.set })?.id;
    },
    {
      refetchQueries: [query.folders_by_pk({ id })]
    }
  );

  if (!session?.roles?.includes("admin")) return null;

  const formatAuthors = (a: authorships[] | undefined) =>
    a?.map((a) => a.identity?.displayName ?? a.name).join(", ");

  const formatContent = (content: Maybe<contents>): string => {
    return `<h1>${content?.name}</h1><blockquote><i>${formatAuthors(
      content?.authors()
    )}</i></blockquote>${content?.data}${
      content?.children ? content?.children().map(formatContent).join("") : ""
    }`;
  };

  const handleExport = async () => {
    const exportFolder = query.folders_by_pk({ id: folder?.id })

    const html = exportFolder?.contents().map(formatContent).join("");
    const blob = await HTMLtoDOCX(html as string, "", {
      table: { row: { cantSplit: true } },
    });

    // Create and evoke link to file
    const blobUrl = URL.createObjectURL(blob);
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
      <SpeedDial
        ariaLabel="Administrer mappe"
        sx={{ position: "fixed", bottom: (t) => t.spacing(16), right: (t) => t.spacing(3) }}
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
      <AddFolderDialog
        folder={folder}
        open={addDialog}
        setOpen={setAddDialog}
      />
    </>
  );
}
