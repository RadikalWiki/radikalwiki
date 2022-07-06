import React, { useEffect } from "react";
import { NavBar, Scroll, TopBar, SessionProvider, Breadcrumbs } from "comps";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import nhost from "nhost";

export default function Layout({ children }: { children?: any }) {
  const { asPath, push } = useRouter();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!asPath.match(/^\/user\/|^\/$/) && !isLoading && !isAuthenticated) {
      push("/user/login");
    }
  }, [isLoading, isAuthenticated, asPath, push]);

  const refresh = () => nhost.auth.refreshSession();

  useEffect(() => {
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (asPath.match(/\?app=screen/))
    return <SessionProvider>{isAuthenticated && children}</SessionProvider>;

  return (
    <SessionProvider>
      <Scroll>
        <TopBar />
        <Container sx={{ pl: 0, pr: 0 }}>
          {isAuthenticated && !asPath.match(/^\/user\//) && <Breadcrumbs />}
          {(isAuthenticated || asPath.match(/^\/user\/|^\/$/)) && children}
          <Box sx={{ p: 8 }} />
        </Container>
      </Scroll>
      {!asPath.match(/^\/user\/$/) && isAuthenticated && <NavBar />}
    </SessionProvider>
  );
}
