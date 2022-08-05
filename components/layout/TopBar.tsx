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
  styled,
  alpha,
  InputBase,
} from "@mui/material";
import { Menu, ArrowDropDown, Search } from "@mui/icons-material";
import { UserButton, PrefixDialog, HideOnScroll } from "comps";
import { useSession } from "hooks";
import { useAuthenticationStatus } from "@nhost/react";
import { Container } from "@mui/system";
import { drawerWidth } from "core/constants";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopBar({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: Function;
}) {
  const [session] = useSession();
  const [prefixDialog, setPrefixDialog] = useState(false);
  const { isAuthenticated } = useAuthenticationStatus();
  const largeScreen = useMediaQuery("(min-width:640px)");

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
          <Toolbar>
            {session &&
              isAuthenticated && [
                ...(largeScreen
                  ? []
                  : [
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
                  ]),
                <SearchBox key="search">
                  <SearchIconWrapper>
                    <Search />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Søg…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </SearchBox>
              ]}
            <Box sx={{ flexGrow: 1 }} />
            <UserButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {isAuthenticated && (
        <>
          <Suspense fallback={null}>
            <PrefixDialog open={prefixDialog} setOpen={setPrefixDialog} />
          </Suspense>
        </>
      )}
      <Box sx={{ p: 4 }} />
    </>
  );
}
