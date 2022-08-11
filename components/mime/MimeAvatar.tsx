import { LockOpen } from "@mui/icons-material";
import { Badge, Tooltip, Avatar as MuiAvatar, Skeleton } from "@mui/material";
import { order_by } from "gql";
import { withSuspense } from "hoc";
import { Node, useNode, useScreen } from "hooks";
import { getIconFromId } from "mime";
import { MimeSkeleton } from "comps";

const Avatar = ({ node }: { node: Node }) => {
  const screen = useScreen();
  const query = node?.useQuery();
  const type = query?.data?.({ path: "type" });
  const mimeId = query?.mimeId;
  const id = type ?? mimeId;
  const index =
    query?.parent
      ?.children({
        where: {
          _and: [
            { mutable: { _eq: false } },
            { mime: { icon: { _in: ["number", "letter"] } } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((child) => child.id === node.id) ?? 0;

  if (id === undefined) {
    return (
      <Skeleton variant="circular" width={40} height={40} />
    );
  }

  const avatar = (
    <MuiAvatar
      sx={{
        bgcolor: (t) =>
          screen ? t.palette.primary.main : t.palette.secondary.main,
      }}
    >
      {getIconFromId(id, index, true)}
    </MuiAvatar>
  );
  return query?.mutable && !screen ? (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <Tooltip title="Ikke indsendt">
          <MuiAvatar
            sx={{
              width: 18,
              height: 18,
              bgcolor: (t) => t.palette.primary.main,
            }}
          >
            <LockOpen
              sx={{
                width: 14,
                height: 14,
                color: "#fff",
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

const MimeAvatar = withSuspense(Avatar, MimeSkeleton);
const MimeAvatarId = withSuspense(({ id }: { id: string }) => {
  const node = useNode({ id });
  return <Avatar node={node} />;
}, MimeSkeleton);

export { MimeAvatarId, MimeAvatar };
