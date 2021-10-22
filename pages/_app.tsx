import React, { useEffect, ComponentType } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material";
import Head from "next/head";
import { Layout } from "comps";
import { useTheme } from "hooks";
import { auth } from "utils/nhost";
import { NhostAuthProvider } from "@nhost/react-auth";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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

      <NhostAuthProvider auth={auth}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </NhostAuthProvider>
    </>
  );
}
