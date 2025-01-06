import { createTheme } from "@mui/material";

const theme = {
  palette: {
    primary: {
      main: "#BF272D",
    },
  },
  typography: {
    fontFamily: ["Inter", "Outfit", "Prata", "Public Sans", "sans-serif"].join(
      ","
    ),
  },
};

export default createTheme(theme);
