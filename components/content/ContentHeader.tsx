import { CardHeader, Skeleton, Typography } from '@mui/material';
import { MimeAvatarNode, MemberChips, ContentToolbar, MimeAvatar } from 'comps';
import { Suspense } from 'react';
import { Node, useScreen } from 'hooks';
import { Stack } from '@mui/system';

const Title = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  const screen = useScreen();
  return query?.name ? (
    <Stack>
      <Typography variant={screen ? 'h5' : 'body1'} sx={{ color: 'inherit' }}>
        {query?.name}
      </Typography>
    </Stack>
  ) : null;
};

const ContentHeader = ({
  node,
  hideMembers,
  child,
  add,
}: {
  node: Node;
  hideMembers?: boolean;
  child?: boolean;
  add?: boolean;
}) => {
  return (
    <>
      <CardHeader
        title={
          child ? (
            'Mappe'
          ) : (
            <Suspense fallback={<Skeleton width={10} />}>
              <Title node={node} />
            </Suspense>
          )
        }
        avatar={
          child ? (
            <MimeAvatar mimeId="app/folder" />
          ) : (
            <MimeAvatarNode node={node} />
          )
        }
        sx={{
          borderRadius: '4px 4px 0px 0px',
        }}
        action={<ContentToolbar child={child} add={add} node={node} />}
      />
      {!hideMembers && <MemberChips node={node} />}
    </>
  );
};

export default ContentHeader;
