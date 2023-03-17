import { LockOpen } from '@mui/icons-material';
import { Badge, Tooltip, Avatar as MuiAvatar, Skeleton } from '@mui/material';
import { Maybe, order_by } from 'gql';
import { withSuspense } from 'hoc';
import { Node, useNode, useScreen } from 'hooks';
import { IconId } from 'mime';
import { MimeSkeleton } from 'comps';

const MimeAvatar = ({
  mimeId,
  index,
  name,
}: {
  mimeId: Maybe<string | undefined>;
  index?: number;
  name?: string;
}) => {
  const screen = useScreen();
  return (
    <MuiAvatar
      sx={{
        bgcolor: screen ? 'primary.main' : 'secondary.main',
      }}
    >
      <IconId name={name} mimeId={mimeId} index={index} avatar />
    </MuiAvatar>
  );
};

const Avatar = ({ node }: { node: Node }) => {
  const screen = useScreen();
  const query = node?.useQuery();
  const type = query?.data?.({ path: 'type' });
  const mimeId = query?.mimeId;
  const id = type ?? mimeId;
  const name = query?.name;
  const index =
    query?.parent
      ?.children({
        where: {
          _and: [
            { mutable: { _eq: false } },
            { mime: { icon: { _in: ['number', 'letter'] } } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((child) => child.id === node.id) ?? 0;

  if (id === undefined) {
    return (
      <MuiAvatar
        sx={{
          bgcolor: screen ? 'primary.main' : 'secondary.main',
        }}
      >
        {' '}
      </MuiAvatar>
    );
  }

  const avatar = (
    <MuiAvatar
      sx={{
        bgcolor: screen ? 'primary.main' : 'secondary.main',
      }}
    >
      <IconId name={name} mimeId={id} index={index} avatar />
    </MuiAvatar>
  );
  return query?.mutable && !screen ? (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={
        <Tooltip title="Ikke indsendt">
          <MuiAvatar
            sx={{
              width: 18,
              height: 18,
              bgcolor: 'primary.main',
            }}
          >
            <LockOpen
              sx={{
                width: 14,
                height: 14,
                color: '#fff',
              }}
            />
          </MuiAvatar>
        </Tooltip>
      }
    >
      {avatar}
    </Badge>
  ) : (
    avatar
  );
};

const MimeAvatarNode = withSuspense(Avatar, MimeSkeleton);
const MimeAvatarId = withSuspense(({ id, ...props }: { id: string }) => {
  const node = useNode({ id });
  return <Avatar node={node} {...props} />;
}, MimeSkeleton);

export { MimeAvatar, MimeAvatarNode, MimeAvatarId };
