import { createTheme, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSession } from "hooks";

export const theme = {
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#ec407a",
    },
    secondary: {
      main: "#303f9f",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#61ac24",
    },
  },
};

const light = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: "light",
  },
});

const dark = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: "dark",
  },
});

export default function useTheme() {
  const [session] = useSession();
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return session?.theme === "dark" ? dark : light;
}
