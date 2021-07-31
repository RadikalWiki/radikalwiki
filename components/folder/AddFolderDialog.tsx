import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { FOLDERS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddFolderDialog({ folder, open, setOpen }: any) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mode, setMode] = useState("");
  const [addFolders] = useMutation(FOLDERS_ADD);

  const handleSubmit = async () => {
    const { data } = await addFolders({
      variables: {
        objects: [
          {
            name,
            subtitle,
            eventId: session.event.id,
            mode,
            parentId: folder.id,
          },
        ],
      },
    });
    router.push(`/folder/${data.insert_folders.returning[0].id}`);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Tilføj mappe</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              label="Navn - Fx Resolutioner"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Undertitel - Fx Vedtægter, principprogram og andet"
              fullWidth
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Indholdstype</InputLabel>
              <Select
                fullWidth
                value={mode}
                variant="standard"
                onChange={(e) => setMode(e.target.value as string)}
              >
                <MenuItem value="changes">Politik</MenuItem>
                <MenuItem value="candidates">Kandidaturer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
  );
}