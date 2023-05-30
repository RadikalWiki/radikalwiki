/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, ComponentType } from 'react';

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

  return <Component {...pageProps} />;
};

export default App;
