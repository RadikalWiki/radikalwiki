import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { CONTENTS_ADD, AUTHORSHIPS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddContentFab({ folderId }: { folderId: string }) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [addContents] = useMutation(CONTENTS_ADD);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const handleSubmit = async () => {
    const { data } = await addContents({
      variables: {
        objects: [{ name, folderId, data: "", creatorId: session.user.id }],
      },
    });
    const objects = [
      { email: session.user.email, contentId: data.insert_contents[0].id },
    ];
    await addAuthors({ variables: { objects } });
    router.push(`/content/${data.insert_contents.id}/edit`);
  };

  return (
    <>
      <Fab
        className={classes.speedDial}
        variant="extended"
        color="primary"
        aria-label="Tilføj indhold"
        onClick={() => setOpen(true)}
      >
        <Add className={classes.extendedIcon} />
        Indhold
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tilføj indhold</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Title - Fx afskaf ananas på pizza"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Anuller
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Tilføj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
