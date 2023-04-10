import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import { Node, useLink } from 'hooks';
import { Delete } from '@mui/icons-material';
import { fromId } from 'core/path';

const DeleteDialog = ({
  node,
  open,
  setOpen,
}: {
  node: Node;
  open: boolean;
  setOpen: Function;
}) => {
  const query = node.useQuery();
  const link = useLink();
  const $delete = node.useDelete();

  const handleDelete = async () => {
    await $delete();
    link.pop();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Bekræft Sletning</DialogTitle>
      <DialogActions>
        <Button
          endIcon={<Delete />}
          variant="contained"
          color="primary"
          onClick={handleDelete}
        >
          Slet
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;