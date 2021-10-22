import React, { Suspense, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Tooltip,
  useMediaQuery,
  Box,
} from "@mui/material";

import { Menu, ArrowDropDown } from "@mui/icons-material";
import { Drawer, UserButton, EventDialog, HideOnScroll } from "comps";
import { useSession } from "hooks";
import { useAuth } from "@nhost/react-auth";

export default function TopBar() {
  const [session] = useSession();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [eventDialog, setEventDialog] = useState(false);
  const largeScreen = useMediaQuery("(min-width:640px)");
  const { signedIn } = useAuth();

  const name = largeScreen ? session?.event?.name : session?.event?.shortName;

  return (
    <>
      <HideOnScroll>
        <AppBar elevation={2}>
          <Toolbar>
            {session && [
              <IconButton
                key="menu"
                aria-label="menu"
                edge="start"
                color="inherit"
                onClick={() => setOpenDrawer(!openDrawer)}
                size="large"
              >
                <Menu />
              </IconButton>,
              <Tooltip key="tooltip" title="Vælg begivenhed">
                <Button
                  color="inherit"
                  endIcon={<ArrowDropDown />}
                  onClick={() => setEventDialog(true)}
                >
                  <Typography color="inherit" variant="h6">
                    {name || "Vælg begivenhed"}
                  </Typography>
                </Button>
              </Tooltip>,
            ]}
            <Box sx={{ flexGrow: 1 }} />
            <UserButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer open={openDrawer} onClick={() => setOpenDrawer(false)} />
      {signedIn && (
        <Suspense fallback={null}>
          <EventDialog open={eventDialog} setOpen={setEventDialog} />
        </Suspense>
      )}
      <Box sx={{ p: 4 }} />
    </>
  );
}
