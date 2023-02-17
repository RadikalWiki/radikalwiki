import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { Box } from '@mui/system';
import { MimeLoader, AppLoader, HomeApp, UnknownApp } from 'comps';

export default function Loader({ app, id }: { app?: string; id?: string }) {
  const router = useRouter();

  if (!router.query.app && app === 'home') {
    return <HomeApp />;
  } else if (router.query.app || app) {
    return (
      (id && <AppLoader app={(router.query.app as string) ?? app} id={id} />) ||
      null
    );
  } else {
    return (
      <Suspense
        fallback={
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        {id ? <MimeLoader id={id} /> : <UnknownApp />}
      </Suspense>
    );
  }
}
