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
import { CONTENT_ADD, AUTHORSHIPS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddContentFab({ categoryId }: { categoryId: string }) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [addContent] = useMutation(CONTENT_ADD);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const handleSubmit = async () => {
    const { data } = await addContent({
      variables: { name, categoryId, data: "", creatorId: session.user.id },
    });
    const objects = [
      { email: session.user.email, contentId: data.insert_contents_one.id },
    ];
    await addAuthors({ variables: { objects } });
    router.push(`/content/${data.insert_contents_one.id}/edit`);
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
