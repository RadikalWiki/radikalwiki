import React, { useContext, useState } from 'react';
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  HowToReg,
  LockReset,
  Login,
  Logout,
  ManageAccounts,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { nhost } from 'nhost';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { ThemeModeContext } from 'core/theme/ThemeModeContext';

const UserMenu = ({ list }: { list?: boolean }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated } = useAuthenticationStatus();
  const { toggleThemeMode } = useContext(ThemeModeContext);
  const { palette } = useTheme();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await nhost.auth.signOut();
    setAnchorEl(null);
  };

  const handleUser = (mode: 'login' | 'register' | 'set-password') => () => {
    setAnchorEl(null);
    router.push(`/user/${mode}`);
  };

  return (
    <>
      {list ? (
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              mr: 'auto',
              justifyContent: 'center',
            }}
          >
            <ManageAccounts />
          </ListItemIcon>
        </ListItemButton>
      ) : (
        <IconButton onClick={handleClick}>
          <ManageAccounts />
        </IconButton>
      )}
      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
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
            {palette.mode == 'light' ? <Brightness4 /> : <Brightness7 />}
          </ListItemIcon>
          <ListItemText>
            {palette.mode == 'light' ? 'Mørk' : 'Lys'}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
