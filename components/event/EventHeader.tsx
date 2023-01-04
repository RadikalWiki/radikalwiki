import { CardHeader, Typography } from "@mui/material";
import { MimeAvatarNode, ExpandButton } from "comps";
import { Node, useNode } from "hooks";

export default function EventHeader({
  node,
  expand,
  setExpand,
}: {
  node: Node;
  expand: boolean;
  setExpand: Function;
}) {
  const query = node.useQuery();
  return (
    <CardHeader
      title={<Typography>{query?.name}</Typography>}
      avatar={<MimeAvatarNode node={node} />}
      subheader={query
        ?.members()
        .map((m) => m.name ?? m.user?.displayName)
        .join(", ")}
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
