import { Face } from '@mui/icons-material';
import { Chip, Collapse, Skeleton, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Node, useScreen } from 'hooks';
import { IconId } from 'mime';

const MemberChips = ({
  node,
  child,
}: {
  node: Node;
  child?: boolean;
}) => {
  const screen = useScreen();
  const members = node.useQuery()?.members();
  const chips =
    members?.map(({ id, name, node, user }) => {
      return (
        <Tooltip key={id ?? 0} title="Forfatter">
          <Chip
            icon={node?.mimeId ? <IconId mimeId={node?.mimeId} /> : <Face />}
            size={screen ? 'medium' : 'small'}
            color="secondary"
            label={
              <Typography variant={screen ? 'h5' : undefined}>
                {name ?? user?.displayName}
              </Typography>
            }
          />
        </Tooltip>
      );
    }) ?? [];
  return (
    <Collapse in={members?.[0]?.id && members?.length !== 0}>
      <Stack direction="row" spacing={0.5} sx={{ p: child ? 0 : 1 }}>
        {chips}
      </Stack>
    </Collapse>
  );
}

export default MemberChips;