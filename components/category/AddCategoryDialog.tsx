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
  Box,
  Grid,
} from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { CATEGORY_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddCategoryFab({ open, setOpen }: any) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [childMode, setChildMode] = useState("");
  const [addCategory] = useMutation(CATEGORY_ADD);

  const handleSubmit = async () => {
    const { data } = await addCategory({
      variables: { name, subtitle, eventId: session.event.id, childMode },
    });
    router.push(`/category/${data.insert_categories.id}`);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Tilføj kategori</DialogTitle>
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
                value={childMode}
                variant="standard"
                onChange={(e) => setChildMode(e.target.value as string)}
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
