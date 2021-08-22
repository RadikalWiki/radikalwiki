import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {
  Add,
  LowPriority,
  GetApp,
  SupervisorAccount,
  Lock,
  LockOpen,
} from "@material-ui/icons";
import { useStyles } from "hooks";
import { AddFolderDialog } from ".";
import { useRouter } from "next/router";
import HTMLtoDOCX from "html-to-docx";
import { useApolloClient, useMutation } from "@apollo/client";
import { FOLDER_GET, FOLDER_GET_EXPORT, FOLDER_UPDATE } from "gql";

export default function FolderDial({ folder }: { folder: any }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [addDialog, setAddDialog] = useState(false);
  const client = useApolloClient();
  const [updateFolder] = useMutation(FOLDER_UPDATE);

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  const formatContent = (content: any) => {
    return `<h1>${content.name}</h1><blockquote><i>${formatAuthors(
      content.authors
    )}</i></blockquote>${content.data}${
      content.children ? content.children.map(formatContent).join("") : ""
    }`;
  };

  const handleExport = async () => {
    const { data } = await client.query({
      query: FOLDER_GET_EXPORT,
      variables: { id: folder.id },
    });

    const html = data.export.contents.map(formatContent).join("");
    const blob = await HTMLtoDOCX(html, "", {
      table: { row: { cantSplit: true } },
    });

    // Create and evoke link to file
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${folder.name} Eksport.docx`;
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
    const set = { lockContent: !folder.lockContent };
    await updateFolder({
      variables: { id: folder.id, set },
      refetchQueries: [{ query: FOLDER_GET, variables: { id: folder.id } }],
    });
  };

  const handleLockChildren = async () => {
    const set = { lockChildren: !folder.lockChildren };
    await updateFolder({
      variables: { id: folder.id, set },
      refetchQueries: [{ query: FOLDER_GET, variables: { id: folder.id } }],
    });
  };

  const childName =
    folder?.mode == "changes" ? "ændringsforslag" : "kandidaturer";

  return (
    <>
      <SpeedDial
        ariaLabel="Administrer mappe"
        className={classes.speedDial2}
        icon={<SupervisorAccount />}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
      >
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
              {folder?.lockContent ? <LockOpen /> : <Lock />}
            </Avatar>
          }
          tooltipTitle={`${folder?.lockContent ? "Lås op" : "Lås"} indhold`}
          tooltipOpen
          onClick={handleLockContent}
        />
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
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
            <Avatar className={classes.avatar}>
              <Add />
            </Avatar>
          }
          tooltipTitle="Mappe"
          tooltipOpen
          onClick={() => setAddDialog(true)}
        />
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
              <LowPriority />
            </Avatar>
          }
          tooltipTitle="Sorter"
          tooltipOpen
          onClick={() => router.push(`/folder/${folder.id}/sort`)}
        />
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
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
