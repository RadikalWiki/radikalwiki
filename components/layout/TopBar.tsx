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
import { Drawer, UserButton, PrefixDialog, HideOnScroll } from "comps";
import { useSession } from "hooks";
import { useAuthenticationStatus } from "@nhost/react";
import { Container } from "@mui/system";

export default function TopBar() {
  const [session] = useSession();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [prefixDialog, setPrefixDialog] = useState(false);
  const { isAuthenticated } = useAuthenticationStatus();
  const largeScreen = useMediaQuery("(min-width:640px)");

  const name = session?.prefix?.name;

  return (
    <>
      <HideOnScroll>
        <AppBar elevation={2} enableColorOnDark>
          <Container>
            <Toolbar>
              {session &&
                isAuthenticated && [
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
                      onClick={() => setPrefixDialog(true)}
                    >
                      <Typography
                        color="inherit"
                        variant={largeScreen ? "h6" : undefined}
                      >
                        {name ?? "Vælg begivenhed"}
                      </Typography>
                    </Button>
                  </Tooltip>,
                ]}
              <Box sx={{ flexGrow: 1 }} />
              <UserButton />
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {isAuthenticated && (
        <>
          <Suspense fallback={null}>
            <PrefixDialog open={prefixDialog} setOpen={setPrefixDialog} />
          </Suspense>
          <Drawer open={openDrawer} setOpen={() => setOpenDrawer(false)} />
        </>
      )}
      <Box sx={{ p: 4 }} />
    </>
  );
}
