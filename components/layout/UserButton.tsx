import React, { useState } from "react";
import { Button, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { Link } from "comps";
import { AccountCircle } from "@mui/icons-material";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { auth } from "utils/nhost";

const abriviateName = (name: string) =>
  name?.split(" ").length === 1
    ? name
    : name?.split(" ").map((s) => (s ? s[0].toUpperCase() : ""));

export default function UserButton() {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
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
    router.push("/");
  };

  const handleLogin = (mode: "login" | "register") => () => {
    setAnchorEl(null);
    router.push(`/user/${mode}`);
  };

  const name = largeScreen
    ? session?.user?.name
    : abriviateName(session?.user?.name as string);

  return (
    <>
      <Button color="inherit" onClick={handleClick} endIcon={<AccountCircle />}>
        {session?.user?.name ? name : "Log ind"}
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
    </>
  );
}
