import React, { useEffect, ComponentType } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import Head from "next/head";
import { Layout } from "components";
import { useApollo, useTheme } from "hooks";
import { ApolloProvider } from "@apollo/client";

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
  const apollo = useApollo();
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

      <ApolloProvider client={apollo}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </>
  );
}
