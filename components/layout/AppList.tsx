import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { useApps } from 'hooks';
import { IconId } from 'mime';
import UserMenu from './UserMenu';
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
          <IconId mimeId={app.mimeId} />
        </IconButton>
      ))}
      <Box sx={{ height: '100%' }} />
      <UserMenu />
    </Stack>
  );
};

export default AppList;
