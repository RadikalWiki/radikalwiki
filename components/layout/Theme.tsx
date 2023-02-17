import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useTheme } from 'hooks';

export default function Theme({ children }: { children?: any }) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
