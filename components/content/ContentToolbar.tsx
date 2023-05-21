import { ButtonGroup, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Node, useLink } from 'hooks';
import {
  AutoButton,
  DeleteButton,
  DownloadButton,
  AddContentButton,
  PublishButton,
} from 'comps';

const ContentToolbar = ({ node, child, add }: { node: Node; child?: boolean, add?: boolean }) => {
  const query = node.useQuery();
  const link = useLink();

  if (child) return null;

  return (
    <Stack spacing={1} direction="row">
      <DownloadButton node={node} />
      <ButtonGroup>
        {((query?.mutable && query?.isOwner) || query?.isContextOwner) && [
          <DeleteButton key="delete" node={node} />,
          <AutoButton
            key="edit"
            text="Rediger"
            icon={<Edit />}
            onClick={() => link.push([], 'editor')}
          />,
          <PublishButton key="publish" node={node} />
        ]}
      </ButtonGroup>
      {add &&<AddContentButton node={node} />}
    </Stack>
  );
};

export default ContentToolbar;
