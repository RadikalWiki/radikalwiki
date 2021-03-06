import React, { useState } from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Link } from "comps";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Face,
  HowToReg,
  Login,
  Logout,
} from "@mui/icons-material";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { auth } from "nhost";
import { useAuthenticationStatus, useUserDisplayName } from "@nhost/react";

const abriviateName = (name: string) =>
  name?.split(" ").length === 1
    ? name
    : name?.split(" ").map((s) => (s ? s[0].toUpperCase() : ""));

export default function UserButton() {
  const router = useRouter();
  const displayName = useUserDisplayName();
  const [session, setSession] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const largeScreen = useMediaQuery("(min-width:640px)");
  const { isAuthenticated } = useAuthenticationStatus();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = () => {
    setSession({ theme: session?.theme === "dark" ? "light" : "dark" });
  };

  const handleLogout = async () => {
    await auth.signOut();
    setSession(null);
    setAnchorEl(null);
  };

  const handleLogin = (mode: "login" | "register") => () => {
    setAnchorEl(null);
    router.push(`/user/${mode}`);
  };

  const name = largeScreen ? displayName : abriviateName(displayName as string);

  return (
    <>
      <Button color="inherit" onClick={handleClick} endIcon={<AccountCircle />}>
        {isAuthenticated ? name : "Log ind"}
      </Button>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
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
          // <MenuItem
          //   key="theme"
          //   onClick={handleTheme}
          // >
          //   <ListItemIcon>
          //     {session?.theme === "dark" ? <Brightness7 /> : <Brightness4 />}
          //   </ListItemIcon>
          //   <ListItemText>
          //     {session?.theme === "dark" ? "Lys" : "M??rk"}
          //   </ListItemText>
          // </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log ud</ListItemText>
          </MenuItem>,
        ]) || [
          <MenuItem key="login" onClick={handleLogin("login")}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText>Log ind</ListItemText>
          </MenuItem>,
          <MenuItem key="register" onClick={handleLogin("register")}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText>Registrer</ListItemText>
          </MenuItem>,
        ]}
      </Menu>
    </>
  );
}
