import { Face } from "@mui/icons-material";
import { Chip, Skeleton } from "@mui/material";
import { Node } from "hooks";
import { getIconFromId } from "mime";

export default function MemberChips({ node }: { node: Node }) {
  const members = node.useQuery()?.members();
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