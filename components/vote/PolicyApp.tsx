import React from 'react';
import { ChangeList, ContentApp, PollList, FolderDial } from 'comps';
import { Node } from 'hooks';
import { Stack } from '@mui/material';

const PolicyApp = ({ node }: { node: Node }) => (
  <Stack spacing={1}>
    <ContentApp node={node} />
    <ChangeList node={node} />
    <PollList node={node} />
    <FolderDial node={node} />
  </Stack>
);

export default PolicyApp;
