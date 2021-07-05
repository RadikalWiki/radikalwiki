import React, { useEffect, ComponentType } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import Head from "next/head";
import { Layout } from "comps";
import { useTheme, useEnv } from "hooks";
//import { auth, useAuth, NhostAuthProvider, NhostApolloProvider } from "utils/nhost";
import { auth } from "utils/nhost";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostAuthProvider, useAuth } from "@nhost/react-auth";

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

  const local = typeof window === "undefined";
  let endpoint = local
    ? process.env.GRAPHQL_HTTP_LOCAL
    : process.env.NEXT_PUBLIC_GRAPHQL_HTTP;

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
        <NhostApolloProvider
          auth={auth}
          connectToDevTools={true}
          gqlEndpoint={endpoint}
        >
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StylesProvider>
        </NhostApolloProvider>
      </NhostAuthProvider>
    </>
  );
}
