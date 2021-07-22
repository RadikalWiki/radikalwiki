import React from "react";
import { NavBar, Scroll, TopBar, SessionProvider } from "comps";
import { useStyles } from "hooks";
import { useAuth } from "@nhost/react-auth";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";

export default function Layout({ children }: { children?: any }) {
  const { pathname } = useRouter();
  const { signedIn } = useAuth();
  const classes = useStyles();

  if (["/screen", "/login"].includes(pathname))
    return <SessionProvider>{signedIn != null && children}</SessionProvider>;

  return (
    <SessionProvider>
      <TopBar />
      <Scroll>
        <Container>
          {signedIn != null && children}
          <div className={classes.pad} />
        </Container>
      </Scroll>
      <NavBar />
    </SessionProvider>
  );
}
