import React, { useState } from "react";
import { Fab, Zoom } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useQuery } from "gql";
import { AddContentDialog } from "comps";

export default function AddContentFab({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const query = useQuery();
  const parent = query.node({ id });
  const mimeChildren =
    parent?.mime?.children({ where: { hidden: { _eq: false } } }) ?? [];

  if (!(parent?.mutable && parent?.isOwner) && !parent?.isContextOwner)
    return null;

  return (
    <>
      <Zoom in={true}>
        <Fab
          sx={{
            position: "fixed",
            bottom: (t) => t.spacing(9),
            right: (t) => t.spacing(3),
          }}
          variant="extended"
          color="primary"
          aria-label="Tilføj indhold"
          onClick={() => setOpen(true)}
        >
          <Add sx={{ mr: 1 }} />
          Tilføj
        </Fab>
      </Zoom>
      <AddContentDialog
        id={id}
        open={open}
        setOpen={setOpen}
        mimes={mimeChildren}
      />
    </>
  );
}
