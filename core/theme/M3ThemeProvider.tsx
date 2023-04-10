import React, { FC, useContext, useEffect, useMemo } from 'react';

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './M3Theme';
import { deepmerge } from '@mui/utils';
import { ThemeModeContext } from './ThemeModeContext';
import { ThemeSchemeContext } from './ThemeSchemeContext';
import { CssBaseline } from '@mui/material';

interface M3ThemeProps {
  children: React.ReactNode;
}

const M3ThemeProvider: FC<M3ThemeProps> = ({ children }) => {
  const { themeMode } = useContext(ThemeModeContext);
  const { themeScheme } = useContext(ThemeSchemeContext);

  const m3Theme = useMemo(() => {
    const designTokens = getDesignTokens(
      themeMode,
      themeScheme[themeMode],
      themeScheme.tones
    );
    const newM3Theme = createTheme(designTokens);
    const newM3ThemeMerged = deepmerge(
      newM3Theme,
      getThemedComponents(newM3Theme)
    );

    if (typeof window !== 'undefined')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', themeScheme[themeMode].surface);

    return newM3ThemeMerged;
  }, [themeMode, themeScheme]);

  return (
    <ThemeProvider theme={m3Theme}>
      <CssBaseline enableColorScheme />
      {children}.
    </ThemeProvider>
  );
};

export default M3ThemeProvider;
