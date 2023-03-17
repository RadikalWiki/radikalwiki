import { CardHeader, Skeleton, Typography } from '@mui/material';
import { MimeAvatarNode, ExpandButton, MemberChips } from 'comps';
import { Suspense } from 'react';
import { Node, useScreen } from 'hooks';

const Title = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  return query?.name ? (
    <Typography variant="h5" sx={{ color: 'inherit' }}>
      {query?.name}
    </Typography>
  ) : null;
};

const ContentHeader = ({ node }: { node: Node }) => {
  return (
    <CardHeader
      title={
        <Suspense fallback={<Skeleton width={10} />}>
          <Title node={node} />
        </Suspense>
      }
      avatar={<MimeAvatarNode node={node} />}
      sx={{
        bgcolor: 'secondary.main',
        color: (t) => t.palette.secondary.contrastText,
        borderRadius: "4px 4px 0px 0px",
      }}
    />
  );
};

export default ContentHeader;
