import React, { useState } from "react";
import { Fab, Zoom } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AddContentDialog } from "comps";
import { Node, useNode, useScreen } from "hooks";

export default function AddContentFab({ node }: { node: Node }) {
  const screen = useScreen();
  const [open, setOpen] = useState(false);
  const parent = node.useQuery();
  const mimes = parent?.inserts({ where: { hidden: { _eq: false } } })?.map(mime => mime.id!) ?? [];

  if (screen || !parent?.attachable || !mimes?.[0])
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
        node={node}
        open={open}
        setOpen={setOpen}
        mimes={mimes}
        redirect
      />
    </>
  );
}
