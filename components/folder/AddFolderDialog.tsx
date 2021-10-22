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
  Stack,
} from "@mui/material";
import { useSession } from "hooks";
import { folders_insert_input, useMutation } from "gql";
import { useRouter } from "next/router";

export default function AddFolderDialog({ folder, open, setOpen }: any) {
  const [session] = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mode, setMode] = useState("");
  const [addFolders] = useMutation((mutation, args: folders_insert_input[]) => {
    return mutation.insert_folders({ objects: args })?.returning;
  });

  const handleSubmit = async () => {
    const newFolder = await addFolders({
      args: [
        {
          name,
          subtitle,
          eventId: session?.event?.id,
          mode,
          parentId: folder.id,
        },
      ],
    });
    if (!newFolder) return;
    router.push(`/folder/${newFolder[0].id}`);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Tilføj mappe</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            sx={{ mt: 1 }}
            autoFocus
            required
            label="Navn"
            placeholder="Fx Resolutioner"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Undertitel"
            placeholder="Fx Vedtægter, principprogram og andet"
            fullWidth
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Indholdstype</InputLabel>
            <Select
              label="Indholdstype"
              fullWidth
              value={mode}
              onChange={(e) => setMode(e.target.value as string)}
            >
              <MenuItem value="changes">Politik</MenuItem>
              <MenuItem value="candidates">Kandidaturer</MenuItem>
            </Select>
          </FormControl>
        </Stack>
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
