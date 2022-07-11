import { CardHeader, Chip, Skeleton, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { useQuery } from "gql";
import { Face } from "@mui/icons-material";
import { getIcon } from "mime";
import { Suspense } from "react";

function MemberChips({ id }: { id: string }) {
  const query = useQuery();
  const node = query.node({ id });
  const members = node?.members();
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

export function Title({ id }: { id: string }) {
  const query = useQuery();
  const node = query.node({ id });
  return node?.name ? <Typography color="secondary">{node?.name ?? ""}</Typography> : null
}

export default function ContentHeader({
  id,
  expand,
  setExpand,
  hideMembers = false,
}: {
  id: string;
  expand: boolean;
  setExpand: Function;
  hideMembers?: boolean;
}) {
  return (
    <CardHeader
      title={
        <Suspense fallback={<Skeleton width={10} />}>
          <Title id={id} />
        </Suspense>
      }
      avatar={<ContentAvatar id={id} />}
      subheader={
        <>
          {!hideMembers && (
            <Suspense fallback={<Skeleton width={10} />}>
              <MemberChips id={id} />
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
