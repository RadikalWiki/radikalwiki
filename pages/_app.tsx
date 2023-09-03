/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, ComponentType } from 'react';
import Head from 'next/head';
import { nhost } from 'nhost';
import { NhostProvider } from '@nhost/nextjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import M3ThemeProvider from 'core/theme/M3ThemeProvider';
import ThemeModeProvider from 'core/theme/ThemeModeContext';
import ThemeSchemeProvider from 'core/theme/ThemeSchemeContext';
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

      <NhostProvider nhost={nhost}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeModeProvider>
            <ThemeSchemeProvider>
              <M3ThemeProvider>
                <Component {...pageProps} />
              </M3ThemeProvider>
            </ThemeSchemeProvider>
          </ThemeModeProvider>
        </LocalizationProvider>
      </NhostProvider>
      <Analytics />
    </>
  );
};

export default App;
