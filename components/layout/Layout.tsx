import React, { Suspense, useEffect, useState } from "react";
import {
  NavBar,
  Scroll,
  TopBar,
  SessionProvider,
  Breadcrumbs,
  OldBrowser,
  Drawer,
} from "comps";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { Container, Box, useMediaQuery, Grid } from "@mui/material";
import { nhost } from "nhost";
import { checkVersion } from "core/util";
import { useScreen } from "hooks";

export default function Layout({ children }: { children?: any }) {
  const [outdated, setOutdated] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { asPath, push } = useRouter();
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!asPath.match(/^\/user\/|^\/$/) && !isLoading && !isAuthenticated) {
      push("/user/login");
    }
  }, [isLoading, isAuthenticated, asPath, push]);

  const refresh = () => nhost.auth.refreshSession();

  useEffect(() => {
    setOutdated(typeof window !== "undefined" && !checkVersion());
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (outdated) {
    return <OldBrowser />;
  }

  if (asPath.match(/\?app=screen/))
    return <SessionProvider>{isAuthenticated && children}</SessionProvider>;

  return (
    <SessionProvider>
      <Box sx={{ display: "flex" }}>
        {isAuthenticated && (
          <Drawer open={openDrawer} setOpen={() => setOpenDrawer(false)} />
        )}
        <Scroll>
          <TopBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          {(isAuthenticated || asPath.match(/^\/user\/|^\/$/)) && (
            <Container sx={{ pl: 0, pr: 0, pt: 1 }}>
              {children}
            </Container>
          )}
          <Box sx={{ p: 8 }} />
        </Scroll>
      </Box>
      {!asPath.match(/^\/user\/$/) && isAuthenticated && <NavBar />}
    </SessionProvider>
  );
}
