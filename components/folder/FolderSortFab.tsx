import React from "react";
import { Fab, Tooltip } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { FOLDER_UPDATE, CONTENT_UPDATE } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function FolderSortFab({
  folder,
  elements,
}: {
  folder: any;
  elements: any;
}) {
  const router = useRouter();
  const classes = useStyles();
  const [updateFolder] = useMutation(FOLDER_UPDATE);
  const [updateContent] = useMutation(CONTENT_UPDATE);

  const handleClick = () => {
    elements.map(async (e: any, index: number) => {
      const set = { priority: index };
      if (e.type === "folder") {
        await updateFolder({ variables: { id: e.id, set } });
      } else if (e.type === "content") {
        await updateContent({ variables: { id: e.id, set } });
      }
    });
    router.push(`/folder/${folder.id}`);
  };

  return (
    <Tooltip title="Gem sortering">
      <Fab className={classes.speedDial} color="primary" onClick={handleClick}>
        <Save />
      </Fab>
    </Tooltip>
  );
}
