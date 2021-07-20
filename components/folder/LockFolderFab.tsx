import React from "react";
import { Fab } from "@material-ui/core";
import { useStyles } from "hooks";
import { FOLDER_UPDATE } from "gql";
import { useMutation } from "@apollo/client";

export default function AddFolderFab({
  folder,
  mode,
}: {
  folder: any;
  mode: any;
}) {
  const classes = useStyles();
  const [updateFolder] = useMutation(FOLDER_UPDATE);

  if (!folder) return null;

  const handleClick = async () => {
    const set =
      mode == "content"
        ? { lockContent: !folder.lockContent }
        : { lockChildren: !folder.lockChildren };
    await updateFolder({
      variables: { id: folder.id, set },
    });
  };

  const state = mode == "content" ? folder.lockContent : folder.lockChildren;
  const name =
    mode == "content"
      ? "Indhold"
      : folder.mode == "changes"
      ? "Ændringsforslag"
      : "Kandidaturer";

  return (
    <Fab
      className={mode == "content" ? classes.speedDial3 : classes.speedDial4}
      variant="extended"
      color="primary"
      onClick={handleClick}
    >
      {state ? "Åben" : "Lås"} {name}
    </Fab>
  );
}
