import React, { useEffect, ComponentType } from "react";
import Head from "next/head";
import { Layout, SessionProvider, Theme } from "comps";
import { nhost } from "nhost";
import { NhostProvider } from "@nhost/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
          <SessionProvider>
            <Theme>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Theme>
          </SessionProvider>
        </LocalizationProvider>
      </NhostProvider>
    </>
  );
}
