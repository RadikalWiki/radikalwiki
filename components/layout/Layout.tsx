import React, { useEffect, useState } from 'react';
import {
  NavBar,
  Scroll,
  TopBar,
  SessionProvider,
  OldBrowser,
  Drawer,
} from 'comps';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { Container, Box, useMediaQuery, Grid } from '@mui/material';
import { nhost } from 'nhost';
import { checkVersion } from 'core/util';
import { useSession } from 'hooks';

const Layout = ({ children }: { children?: any }) => {
  const [outdated, setOutdated] = useState(false);
  const [showing, setShowing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [session, setSession] = useSession();
  const { asPath, push } = useRouter();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  //useEffect(() => {
  //  if (!asPath.match(/^\/user\/|^\/$/) && !isLoading && !isAuthenticated) {
  //    push("/user/login");
  //  }
  //}, [isLoading, isAuthenticated, asPath, push]);

  //const refresh = () => nhost.auth.refreshSession();

  useEffect(() => {
    setOutdated(typeof window !== 'undefined' && !checkVersion());
    setShowing(true);
    //window.addEventListener("focus", refresh);
    //return () => {
    //  window.removeEventListener("focus", refresh);
    //};
  }, []);

  useEffect(() => {
    if (session !== null && session?.timeDiff === undefined) {
      setSession({ timeDiff: 0 });
      fetch('/api/time').then((res) =>
        res.json().then(({ time }) => {
          setSession({
            timeDiff: new Date().getTime() - new Date(time).getTime(),
          });
        })
      );
    }
  }, [session, setSession]);

  if (outdated) return <OldBrowser />;
  if (!showing) return null;

  if (asPath.match(/\?app=screen/) && isAuthenticated) return children;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {isAuthenticated && (
          <Drawer open={openDrawer} setOpen={() => setOpenDrawer(false)} />
        )}
        <Scroll>
          <TopBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          {typeof window !== 'undefined' && (
            <Container sx={{ pl: 0, pr: 0, pt: 1 }}>{children}</Container>
          )}
          <Box sx={{ p: 8 }} />
        </Scroll>
      </Box>
      {!asPath.match(/^\/user\/$/) && isAuthenticated && <NavBar />}
    </>
  );
}

export default Layout;