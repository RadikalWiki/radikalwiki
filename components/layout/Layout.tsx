import React, { Suspense, startTransition, useEffect, useState } from 'react';
import {
  Scroll,
  BottomBar,
  SessionProvider,
  OldBrowser,
  Drawer,
  MobileMenu,
  AppDrawer,
} from 'comps';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { Container, Box, useMediaQuery } from '@mui/material';
import { checkVersion } from 'core/util';
import { useSession } from 'hooks';

const Layout = ({ children }: { children?: any }) => {
  const [outdated, setOutdated] = useState(false);
  const [showing, setShowing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [session, setSession] = useSession();
  const router = useRouter();
  const { isLoading } = useAuthenticationStatus();
  const largeScreen = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    startTransition(() => {
      setOutdated(typeof window !== 'undefined' && !checkVersion());
      setShowing(true);
    });
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
  if (!showing || isLoading) return null;

  if (router.query.app === 'screen' || router.asPath.startsWith('/user'))
    return children;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Scroll>
          {typeof window !== 'undefined' && (
            <Container sx={{ pl: 1, pr: 1, pt: 1 }} disableGutters>
              {children}
            </Container>
          )}
          <BottomBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Scroll>
        {largeScreen && (
          <AppDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        )}

        <Drawer
          open={openDrawer}
          setOpen={() => startTransition(() => setOpenDrawer(false))}
        />

        {!largeScreen && (
          <MobileMenu openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        )}
      </Box>
    </>
  );
};

export default Layout;
