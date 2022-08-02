import { CardHeader, Chip, Skeleton, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { Face } from "@mui/icons-material";
import { getIconFromId } from "mime";
import { Suspense } from "react";
import { Node, useNode, useScreen } from "hooks";

function MemberChips({ node }: { node: Node }) {
  const members = node.query?.members();
  const chips =
    members?.map(({ id, name, node, user }) => {
      return (
        <Chip
          key={id ?? 0}
          icon={node?.mimeId ? getIconFromId(node.mimeId) : <Face />}
          color="secondary"
          variant="outlined"
          size="small"
          sx={{ mr: 0.5 }}
          label={name ?? user?.displayName}
        />
      );
    }) ?? [];
  return (
    <>
      {!members?.[0]?.id && members?.length !== 0 ? (
        <Skeleton height={20} width={120} />
      ) : (
        chips
      )}
    </>
  );
}

function Title({ node }: { node: Node }) {
  const screen = useScreen();
  return node.query?.name ? (
    screen ? (
      <Typography variant="h5" sx={{ color: "inherit" }}>
        {node.query?.name}
      </Typography>
    ) : (
      <Typography color="secondary">{node.query?.name ?? ""}</Typography>
    )
  ) : null;
}

export default function ContentHeader({
  node,
  expand,
  setExpand,
  hideMembers = false,
}: {
  node: Node;
  expand: boolean;
  setExpand: Function;
  hideMembers?: boolean;
}) {
  const screen = useScreen();
  return (
    <CardHeader
      title={
        <Suspense fallback={<Skeleton width={10} />}>
          <Title node={node} />
        </Suspense>
      }
      avatar={<ContentAvatar node={node} />}
      subheader={
        <>
          {!hideMembers && !screen && (
            <Suspense fallback={<Skeleton width={10} />}>
              <MemberChips node={node} />
            </Suspense>
          )}
        </>
      }
      sx={
        screen ? {
          bgcolor: (t) => t.palette.secondary.main,
          color: (t) => t.palette.secondary.contrastText,
        } : undefined
      }
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
