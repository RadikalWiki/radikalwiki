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
} from "@mui/material";
import { Add, GroupAdd } from "@mui/icons-material";
import { useSession } from "hooks";
import { groups_insert_input, useMutation } from "gql";
import { useRouter } from "next/router";

export default function AddGroupFab() {
  const [session] = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [addGroup] = useMutation(
    (mutation, args: groups_insert_input[]) => {
      return mutation.insert_groups({ objects: args })?.returning;
    }
  );

  const handleSubmit = async () => {
    const group = await addGroup({
      args: [{ name, shortName, creatorId: session?.user?.id }],
    });
    if (!group) return;
    router.push(`/group/${group[0].id}`);
  };

  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: 9,
          right: 3,
        }}
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
