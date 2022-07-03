import { Avatar, Tooltip, Badge } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { order_by, useQuery } from "gql";
import { getIcon } from "mime";

function ContentAvatar({ id, screen }: { id: string; screen?: boolean }) {
  const query = useQuery();
  const node = query.node({ id });

  const index =
    node?.parent
      ?.children({
        where: {
          _and: [
            { attachable: { _eq: true } },
            { mimeId: { _in: ["vote/change", "vote/policy"] } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((e: any) => e.id === node.id) ?? 0;

  const avatar = (
    <Avatar
      sx={{
        bgcolor: (t) =>
          screen ? t.palette.primary.main : t.palette.secondary.main,
      }}
    >
      {getIcon(node?.mimeId!, index)}
    </Avatar>
  );

  return node?.mutable ? (
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

export default ContentAvatar;
