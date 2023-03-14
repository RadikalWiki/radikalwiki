import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Save } from '@mui/icons-material';
import { Node, useLink } from 'hooks';

const SortFab = ({
  node,
  elements,
}: {
  node: Node;
  elements: any;
}) => {
  const link = useLink();
  const update = node.useUpdate();

  const handleClick = async () => {
    const proms = elements.map(async ({ id }: any, index: number) => {
      const set = { index };
      return update({ id, set });
    });
    await Promise.all(proms);
    link.push([])
  };

  return (
    <Tooltip title="Gem sortering">
      <Fab
        sx={{
          position: 'fixed',
          bottom: (t) => t.spacing(9),
          right: (t) => t.spacing(3),
        }}
        color="primary"
        onClick={handleClick}
      >
        <Save />
      </Fab>
    </Tooltip>
  );
}

export default SortFab;