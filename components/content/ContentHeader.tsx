import { CardHeader, Skeleton, Typography } from "@mui/material";
import { MimeAvatarNode, ExpandButton, MemberChips } from "comps";
import { Suspense } from "react";
import { Node, useScreen } from "hooks";

function Title({ node }: { node: Node }) {
  const screen = useScreen();
  const query = node.useQuery();
  return query?.name ? (
    screen ? (
      <Typography variant="h5" sx={{ color: "inherit" }}>
        {query?.name}
      </Typography>
    ) : (
      <Typography>{query?.name ?? ""}</Typography>
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
      avatar={<MimeAvatarNode node={node} />}
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
        !screen && <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
