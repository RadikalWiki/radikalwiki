import React from 'react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import { Node } from 'hooks';
import { Delete } from '@mui/icons-material';
import { fromId } from 'core/path';

const PollDialog = ({
  node,
  open,
  setOpen,
}: {
  node: Node;
  open: boolean;
  setOpen: Function;
}) => {
  const query = node.useQuery();
  const router = useRouter();
  const $delete = node.useDelete();
  const parentId = query?.parentId;

  const handleDelete = async () => {
    await $delete();
    const path = await fromId(parentId);
    router.push('/' + path.join('/'));
  };

  const getMarks = (count: number) =>
    [...Array(count - 1).keys()].map((i) => ({
      value: i + 1,
      label: `${i + 1}`,
    }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Bekræft Sletning</DialogTitle>
      <Divider />
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

export default PollDialog;