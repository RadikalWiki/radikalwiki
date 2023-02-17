import React, { useState } from 'react';
import { Collapse, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AddContentDialog } from 'comps';
import { Node, useNode, useScreen } from 'hooks';

export default function AddContentFab({ node }: { node: Node }) {
  const trigger = useScrollTrigger({
    target:
      typeof document !== 'undefined'
        ? document.querySelector('#scroll') || undefined
        : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const screen = useScreen();
  const [open, setOpen] = useState(false);
  const parent = node.useQuery();
  const mimes =
    parent
      ?.inserts({ where: { hidden: { _eq: false } } })
      ?.map((mime) => mime.id!) ?? [];

  if (screen || !parent?.attachable || !mimes?.[0]) return null;

  return (
    <>
      <Zoom in={true}>
        <Fab
          sx={{
            position: 'fixed',
            bottom: (t) => t.spacing(9),
            right: (t) => t.spacing(3),
          }}
          variant={!trigger ? 'extended' : 'circular'}
          color="primary"
          aria-label="Tilføj indhold"
          onClick={() => setOpen(true)}
        >
          <Add sx={{ mr: !trigger ? 1 : 0 }} />
          {!trigger && 'Tilføj'}
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
