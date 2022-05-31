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
  Stack,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { mimes } from "gql";
import { useRouter } from "next/router";
import { getIcon, getName } from "mime";
import { useNode } from "hooks";

export default function AddContentDialog({
  id,
  open,
  setOpen,
  mimes,
  initName,
}: {
  id: string;
  open: boolean;
  setOpen: Function;
  mimes: mimes[];
  initName?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState<string>(initName ?? "");
  const [mimeId, setMimeId] = useState(mimes?.[0]?.id ?? "");
  const { insert } = useNode({ id });

  const handleSubmit = async () => {
    const { namespace } = await insert({
      name,
      mimeId: mimes.length == 1 ? mimes[0].id : mimeId!,
    });
    if (!namespace) return;
    setOpen(false);
    router.push(`${router.asPath}/${namespace}`);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle color="secondary">
        Tilføj {mimes.length > 1 ? "indhold" : getName(mimes[0])}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            sx={{ mt: 1 }}
            autoFocus
            required
            label="Navn"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          {mimes.length > 1 && (
            <FormControl required fullWidth>
              <InputLabel required>Type</InputLabel>
              <Select
                label="Type_"
                fullWidth
                required
                value={mimeId}
                renderValue={(mimeId) => {
                  const mime = mimes.filter((mime) => mime.id == mimeId)?.[0];
                  return mime ? (
                    <MenuItem sx={{ m: -1 }} key={mime.id} value={mime.id}>
                      <ListItemIcon>{getIcon(mime)}</ListItemIcon>
                      <ListItemText>{getName(mime)}</ListItemText>
                    </MenuItem>
                  ) : null;
                }}
                onChange={(e) => setMimeId(e.target.value)}
              >
                {mimes?.map((mime) => (
                  <MenuItem key={mime?.id ?? 0} value={mime?.id}>
                    <ListItemIcon>{getIcon(mime)}</ListItemIcon>
                    <ListItemText>{getName(mime)}</ListItemText>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          color="secondary"
          variant="outlined"
        >
          Anuller
        </Button>
        <Button
          disabled={!(name && (mimes.length == 1 || mimeId))}
          onClick={handleSubmit}
          color="secondary"
          variant="outlined"
        >
          Tilføj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
