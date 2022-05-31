import { CardHeader, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { useQuery } from "gql";

export default function ContentHeader({
  id,
  expand,
  setExpand,
}: {
  id: string;
  expand: boolean;
  setExpand: Function;
}) {
  const query = useQuery();
  const node = query.node({ id });

  return (
    <CardHeader
      title={<Typography color="secondary">{node?.name}</Typography>}
      avatar={<ContentAvatar id={id} />}
      subheader={node
        ?.members()
        .map((m) => m.name ?? m.user?.displayName)
        .join(", ")}
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
