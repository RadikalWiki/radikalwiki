import { Stack } from '@mui/material';
import { FolderApp, ContentApp, AddContentFab } from 'comps';
import { Node } from 'hooks';

const GroupApp = ({ node }: { node: Node }) => (
  <Stack spacing={1}>
    <ContentApp node={node} hideMembers />
    <FolderApp node={node} child />
    <AddContentFab node={node} />
  </Stack>
);

export default GroupApp;
