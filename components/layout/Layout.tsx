import React from "react";
import { NavBar, Scroll, TopBar, SessionProvider } from "comps";
import { useAuth } from "@nhost/react-auth";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";

export default function Layout({ children }: { children?: any }) {
  const { pathname } = useRouter();
  const { signedIn } = useAuth();

  if (["/login", "/register", "/screen"].includes(pathname))
    return <SessionProvider>{signedIn != null && children}</SessionProvider>;

  return (
    <SessionProvider>
      <Scroll>
        <TopBar />
        <Container sx={{ pl: 0, pr: 0 }}>
          {signedIn != null && children}
          <Box sx={{ p: 4 }} />
        </Container>
      </Scroll>
      <NavBar />
    </SessionProvider>
  );
}
