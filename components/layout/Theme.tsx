import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useTheme } from 'hooks';

const Theme = ({ children }: { children?: any }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;