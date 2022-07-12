import { CardHeader, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
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
  return (
    <CardHeader
      title={<Typography color="secondary">{node.query?.name}</Typography>}
      avatar={<ContentAvatar node={node} />}
      subheader={node.query
        ?.members()
        .map((m) => m.name ?? m.user?.displayName)
        .join(", ")}
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
