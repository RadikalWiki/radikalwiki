import React, { Fragment, startTransition, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { UserButton, HideOnScroll, SearchField } from "comps";
import { useSession } from "hooks";
import { useAuthenticationStatus } from "@nhost/react";
import { Container } from "@mui/system";
import { drawerWidth } from "core/constants";

export default function TopBar({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: Function;
}) {
  const { isAuthenticated } = useAuthenticationStatus();
  const largeScreen = useMediaQuery("(min-width:1200px)");

  const Con = largeScreen ? Container : Fragment;
  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={
            largeScreen && isAuthenticated
              ? {
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }
              : {}
          }
          enableColorOnDark
        >
          <Con>
            <Toolbar>
              {isAuthenticated && [
                ...(largeScreen
                  ? []
                  : [
                    <IconButton
                      key="menu"
                      aria-label="menu"
                      edge="start"
                      color="inherit"
                      onClick={() =>
                        startTransition(() => setOpenDrawer(!openDrawer))
                      }
                      size="large"
                    >
                      <Menu />
                    </IconButton>,
                  ]),
                ,
                <SearchField key="search" />,
              ]}
              <Box sx={{ flexGrow: 1 }} />
              <UserButton />
            </Toolbar>
          </Con>
        </AppBar>
      </HideOnScroll>
      <Box sx={{ p: 4 }} />
    </>
  );
}
