import React, { useState } from "react";
import { Button, Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { Link } from "comps";
import { AccountCircle } from "@material-ui/icons";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { auth } from "utils/nhost";
import { LoginDialog } from "comps/login";

const abriviateName = (name: string) =>
  name?.split(" ").length === 1
    ? name
    : name?.split(" ").map((s) => s[0].toUpperCase());

export default function UserButton() {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginDialog, setLoginDialog] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const largeScreen = useMediaQuery("(min-width:640px)");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await auth.logout();
    setSession(null);
    setAnchorEl(null);
  };

  const handleLogin = (mode: "login" | "register") => () => {
    setAnchorEl(null);
    setMode(mode);
    setLoginDialog(true);
  };

  const name = largeScreen
    ? session?.displayName
    : abriviateName(session?.displayName);

  return (
    <>
      <Button color="inherit" onClick={handleClick} endIcon={<AccountCircle />}>
        {session?.displayName ? name : "Log ind"}
      </Button>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(session && [
          <MenuItem
            key="profile"
            component={Link}
            href="/profile"
            onClick={handleClose}
          >
            Profil
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            Log ud
          </MenuItem>,
        ]) || [
          <MenuItem key="login" onClick={handleLogin("login")}>
            Log ind
          </MenuItem>,
          <MenuItem key="register" onClick={handleLogin("register")}>
            Registrer
          </MenuItem>,
        ]}
      </Menu>
      <LoginDialog mode={mode} open={loginDialog} setOpen={setLoginDialog} />
    </>
  );
}
