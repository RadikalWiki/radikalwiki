import React, { useContext, useState } from 'react';
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'comps';
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Face,
  HowToReg,
  LockReset,
  Login,
  Logout,
} from '@mui/icons-material';
import { useSession } from 'hooks';
import { useRouter } from 'next/router';
import { nhost } from 'nhost';
import { useAuthenticationStatus, useUserDisplayName } from '@nhost/nextjs';
import { ThemeModeContext } from 'core/theme/ThemeModeContext';

const abriviateName = (name: string) =>
  name?.split(' ').length === 1
    ? name
    : name?.split(' ').map((s) => (s ? s[0].toUpperCase() : ''));

const UserButton = () => {
  const router = useRouter();
  const displayName = useUserDisplayName();
  const [session, setSession] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const largeScreen = useMediaQuery('(min-width:1200px)');
  const { isAuthenticated } = useAuthenticationStatus();
  const { toggleThemeMode, resetThemeMode } = useContext(ThemeModeContext);
  const { palette } = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme =
    (session?.theme == undefined && prefersDarkMode) ||
    session?.theme === 'dark'
      ? 'dark'
      : 'light';

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = () => {
    setSession({ theme: theme === 'dark' ? 'light' : 'dark' });
  };

  const handleLogout = async () => {
    await nhost.auth.signOut();
    setAnchorEl(null);
  };

  const handleUser = (mode: 'login' | 'register' | 'set-password') => () => {
    setAnchorEl(null);
    router.push(`/user/${mode}`);
  };

  const name = largeScreen ? displayName : abriviateName(displayName as string);

  return (
    <>
      {isAuthenticated ? (
        <IconButton sx={{ ml: 2 }} color="inherit" onClick={handleClick}>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          onClick={handleClick}
          endIcon={<AccountCircle />}
        >
          Log ind
        </Button>
      )}
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(isAuthenticated && [
          //<MenuItem
          //  key="profile"
          //  component={Link}
          //  href={session?.user?.id!}
          //  onClick={handleClose}
          //>
          //  <ListItemIcon>
          //    <Face />
          //  </ListItemIcon>
          //  <ListItemText>Profil</ListItemText>
          //</MenuItem>,
          <MenuItem key="reset" onClick={handleUser('set-password')}>
            <ListItemIcon>
              <LockReset />
            </ListItemIcon>
            <ListItemText>Sæt Kodeord</ListItemText>
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log ud</ListItemText>
          </MenuItem>,
        ]) || [
          <MenuItem key="login" onClick={handleUser('login')}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText>Log ind</ListItemText>
          </MenuItem>,
          <MenuItem key="register" onClick={handleUser('register')}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText>Registrer</ListItemText>
          </MenuItem>,
        ]}
        <MenuItem key="theme" onClick={toggleThemeMode}>
          <ListItemIcon>
            {palette.mode == 'light' ?  <Brightness4 /> : <Brightness7 />}
          </ListItemIcon>
          <ListItemText>{palette.mode == 'light' ? 'Mørk' : 'Lys' }</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserButton;