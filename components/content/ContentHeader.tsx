import { CardHeader, Chip, Typography } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { useQuery } from "gql";
import { Face } from "@mui/icons-material";
import { getIcon } from "mime";

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
  const query = useQuery();
  const node = query.node({ id });

  return (
    <CardHeader
      title={<Typography color="secondary">{node?.name}</Typography>}
      avatar={<ContentAvatar id={id} />}
      subheader={
        <>
          {!hideMembers &&
            node
              ?.members()
              .map((m) => (
                <Chip
                  key={m.id ?? 0}
                  icon={m.node?.mimeId ? getIcon(m.node?.mimeId) : <Face />}
                  color="secondary"
                  variant="outlined"
                  size="small"
                  sx={{ mr: 0.5 }}
                  label={m.name ?? m.user?.displayName}
                />
              ))}
        </>
      }
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
