import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { CATEGORY_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function AddCategoryFab() {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [childMode, setChildMode] = useState("");
  const [addCategory] = useMutation(CATEGORY_ADD);

  const handleSubmit = async () => {
    const { data } = await addCategory({
      variables: { name, eventId: session.event.id, childMode },
    });
    router.push(`/category/${data.insert_categories_one.id}`);
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
        Tilføj kategori
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tilføj kategori</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Navn - Fx Resolutioner"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Indholdstype</InputLabel>
            <Select
              fullWidth
              value={childMode}
              variant="outlined"
              onChange={(e) => setChildMode(e.target.value as string)}
            >
              <MenuItem value="changes">Resolutioner</MenuItem>
              <MenuItem value="candidates">Kandidaturer</MenuItem>
            </Select>
          </FormControl>
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
