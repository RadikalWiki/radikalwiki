/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, ComponentType } from 'react';
import Head from 'next/head';
import { ErrorBoundary, Level1 } from 'comps';
import { nhost } from 'nhost';
import { NhostProvider } from '@nhost/nextjs';
import { Analytics } from '@vercel/analytics/react';

const App = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>;
  pageProps: any;
}) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>RadikalWiki</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ErrorBoundary>
        <NhostProvider nhost={nhost}>
           <Level1 />
        </NhostProvider>
        <Analytics />
      </ErrorBoundary>
    </>
  );
};

export default App;
