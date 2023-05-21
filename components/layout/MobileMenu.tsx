import {
  IconButton,
  Paper,
  Slide,
  Stack,
} from '@mui/material';
import { useApps } from 'hooks';
import { IconId } from 'mime';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';

const MobileMenu = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [show, setShow] = useState(true);
  const apps = useApps();

  useEffect(() => {
    const scroll = document.querySelector('#scroll');
    scroll?.addEventListener('scroll', handleScroll);
    return () => scroll?.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  const handleScroll = (event: any) => {
    const newScrollPosition = event.target.scrollTop;

    if (Math.abs(scrollPosition - newScrollPosition) > 4) {
      setShow(scrollPosition > newScrollPosition);
    }
    setScrollPosition(newScrollPosition);
  };

  return (
    <Slide direction="left" in={show}>
      <Paper
        sx={{
          borderRadius: '20px 0px 0px 20px',
          position: 'fixed',
          bottom: (t) => t.spacing(9),
          right: (t) => t.spacing(0),
        }}
        elevation={1}
      >
        <Stack direction="row">
          {apps.map((app) => (
            <IconButton key={app.mimeId} color={app.active ? 'primary' : undefined} onClick={app.onClick}>
              <IconId mimeId={app.mimeId} />
            </IconButton>
          ))}
          <UserMenu />
        </Stack>
      </Paper>
    </Slide>
  );
};

export default MobileMenu;
