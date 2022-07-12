import { Avatar, Tooltip, Badge, Skeleton } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { order_by } from "gql";
import { getIcon } from "mime";
import { Suspense } from "react";
import { Node, useScreen } from "hooks";

function ContentAvatarSuspense({ node }: { node: Node }) {
  const screen = useScreen();
  const index =
    node.query?.parent
      ?.children({
        where: {
          _and: [
            { attachable: { _eq: true } },
            { mimeId: { _in: ["vote/change", "vote/policy"] } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((e: any) => e.id === node.query?.id) ?? 0;

  const avatar = node.query?.mimeId ? (
    <Avatar
      sx={{
        bgcolor: (t) =>
          screen ? t.palette.primary.main : t.palette.secondary.main,
      }}
    >
      {getIcon(node.query?.mimeId!, index)}
    </Avatar>
  ) : (
    <ContentAvatarSkeleton />
  );

  return node.query?.mutable ? (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <Tooltip title="Ikke indsendt">
          <Avatar
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
          </Avatar>
        </Tooltip>
      }
    >
      {avatar}
    </Badge>
  ) : (
    avatar
  );
}

function ContentAvatarSkeleton() {
  return (
    <Skeleton width={40} height={40} variant="circular" animation="wave" />
  );
}

export default function ContentAvatar({ node }: { node: Node }) {
  return (
    <Suspense fallback={<ContentAvatarSkeleton />}>
      <ContentAvatarSuspense node={node} />
    </Suspense>
  );
}
