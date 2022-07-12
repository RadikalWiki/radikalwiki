import { CardHeader, Chip, Skeleton, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { Face } from "@mui/icons-material";
import { getIcon } from "mime";
import { Suspense } from "react";
import { Node, useNode } from "hooks";

function MemberChips({ node }: { node: Node }) {
  const members = node.query?.members();
  const chips =
    members?.map(({ id, name, node, user }) => {
      return (
        <Chip
          key={id ?? 0}
          icon={node?.mimeId ? getIcon(node.mimeId) : <Face />}
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
  return node.query?.name ? <Typography color="secondary">{node.query?.name ?? ""}</Typography> : null
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
          {!hideMembers && (
            <Suspense fallback={<Skeleton width={10} />}>
              <MemberChips node={node} />
            </Suspense>
          )}
        </>
      }
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
