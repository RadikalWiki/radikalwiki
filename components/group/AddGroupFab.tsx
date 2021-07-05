import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
} from "@material-ui/core";
import { Add, GroupAdd } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { GROUP_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddGroupFab() {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [addGroup] = useMutation(GROUP_ADD);

  const handleSubmit = async () => {
    const { data } = await addGroup({
      variables: { name, shortName, creatorId: session.user.id },
    });
    router.push(`/group/${data.insert_groups_one.id}`);
  };

  return (
    <>
      <Fab
        className={classes.speedDial}
        variant="extended"
        color="primary"
        aria-label="Tilføj gruppe"
        onClick={() => setOpen(true)}
      >
        <GroupAdd />
        gruppe
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tilføj gruppe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Navn - Fx Århus Radikale Ungdom"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Forkortelse - Fx ÅRU"
            fullWidth
            onChange={(e) => setShortName(e.target.value)}
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
