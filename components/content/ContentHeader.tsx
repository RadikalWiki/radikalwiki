import { CardHeader, Skeleton, Typography } from '@mui/material';
import { MimeAvatarNode, ExpandButton, MemberChips } from 'comps';
import { Suspense } from 'react';
import { Node, useScreen } from 'hooks';

const Title = ({ node }: { node: Node }) => {
  const screen = useScreen();
  const query = node.useQuery();
  return query?.name ? (
    screen ? (
      <Typography variant="h5" sx={{ color: 'inherit' }}>
        {query?.name}
      </Typography>
    ) : (
      <Typography>{query?.name ?? ''}</Typography>
    )
  ) : null;
}

const ContentHeader = ({ node }: { node: Node }) => {
  const screen = useScreen();
  return (
    <CardHeader
      title={
        <Suspense fallback={<Skeleton width={10} />}>
          <Title node={node} />
        </Suspense>
      }
      avatar={<MimeAvatarNode node={node} />}
      sx={
        screen
          ? {
              bgcolor: 'secondary.main',
              color: (t) => t.palette.secondary.contrastText,
            }
          : undefined
      }
    />
  );
}

export default ContentHeader;