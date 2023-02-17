import React from 'react';
import { ChangeList, ContentApp, PollList, FolderDial } from 'comps';
import { Node } from 'hooks';
import { Stack } from '@mui/material';

export default function PolicyApp({ node }: { node: Node }) {
  return (
    <Stack spacing={1}>
      <ContentApp node={node} />
      <ChangeList node={node} />
      <PollList node={node} />
      <FolderDial node={node} />
    </Stack>
  );
}
