import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default function useTheme() {
  return createMuiTheme({
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
