import React from "react";
import { NavBar, Scroll, TopBar, SessionProvider, Auth } from "comps";
import { useStyles } from "hooks";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";

export default function Layout({ children }: { children?: any }) {
  const { pathname } = useRouter();
  const classes = useStyles();

  if (["/screen", "/login"].includes(pathname))
    return (
      <SessionProvider>
        <Auth>{children}</Auth>
      </SessionProvider>
    );

  return (
    <SessionProvider>
      <Auth>
        <TopBar />
        <Scroll>
          <Container>
            {children}
            <div className={classes.pad} />
          </Container>
        </Scroll>
        <NavBar />
      </Auth>
    </SessionProvider>
  );
}
