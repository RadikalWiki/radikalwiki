import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";

import { Menu, ArrowDropDown } from "@material-ui/icons";
import { Drawer, UserButton, EventDialog, HideOnScroll } from "comps";
import { useStyles, useSession } from "hooks";
import { useAuth } from "@nhost/react-auth";

export default function TopBar() {
  const [session] = useSession();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [eventDialog, setEventDialog] = useState(false);
  const largeScreen = useMediaQuery("(min-width:640px)");

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
            <div className={classes.flexGrow} />
            <UserButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer open={openDrawer} onClick={() => setOpenDrawer(false)} />
      <EventDialog open={eventDialog} setOpen={setEventDialog} />
      <div className={classes.padTop} />
    </>
  );
}
