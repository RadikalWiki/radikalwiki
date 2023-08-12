import { Badge, Box, IconButton } from '@mui/material';
import { useApps } from 'hooks';
import { IconId } from 'mime';
import { Stack } from '@mui/system';

const AppList = () => {
  const apps = useApps();

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {apps.map((app) => (
        <IconButton
          key={app.mimeId}
          color={app.active ? 'primary' : undefined}
          onClick={app.onClick}
        >
          <Badge invisible={!app.notifications} color="primary" variant="dot">
            <IconId mimeId={app.mimeId} />
          </Badge>
        </IconButton>
      ))}
      <Box sx={{ height: '100%' }} />
    </Stack>
  );
};

export default AppList;
