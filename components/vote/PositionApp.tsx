import React from 'react';
import {
  ContentApp,
  PollList,
  CandidateList,
  AddContentFab,
  FolderDial,
  QuestionList,
} from 'comps';
import { Node } from 'hooks';
import { Stack } from '@mui/material';

const PositionApp = ({ node }: { node: Node }) => {
  return (
    <Stack spacing={1}>
      <ContentApp node={node} />
      <CandidateList node={node} />
      <QuestionList node={node} />
      <PollList node={node} />
      <AddContentFab node={node} />
      <FolderDial node={node} />
    </Stack>
  );
}

export default PositionApp;