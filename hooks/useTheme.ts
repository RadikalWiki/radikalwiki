import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export default function useTheme() {
  return createTheme({
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
      background: {
        default: "#fff",
      },
    },
  });
}
