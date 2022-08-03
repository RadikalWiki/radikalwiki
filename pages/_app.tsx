import React, { useEffect, ComponentType } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { Layout } from "comps";
import { useTheme } from "hooks";
import { nhost } from "nhost";
import { NhostReactProvider } from "@nhost/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function App({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>;
  pageProps: any;
}) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>RadikalWiki</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <NhostReactProvider nhost={nhost}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </LocalizationProvider>
      </NhostReactProvider>
    </>
  );
}
