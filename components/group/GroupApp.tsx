import { Stack } from '@mui/material';
import { FolderApp, ContentApp } from 'comps';
import { Node } from 'hooks';

export default function GroupApp({ node }: { node: Node }) {
  return (
    <Stack spacing={1}>
      <ContentApp node={node} hideMembers />
      <FolderApp node={node} child />
    </Stack>
  );
}
