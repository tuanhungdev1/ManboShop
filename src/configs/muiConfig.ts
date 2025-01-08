import { createTheme } from "@mui/material";

const theme = {
  typography: {
    // Matching Tailwind's default font sizes
    xs: {
      fontSize: "0.75rem", // text-xs: 12px
      lineHeight: "1rem",
    },
    sm: {
      fontSize: "0.875rem", // text-sm: 14px
      lineHeight: "1.25rem",
    },
    base: {
      fontSize: "1rem", // text-base: 16px
      lineHeight: "1.5rem",
    },
    lg: {
      fontSize: "1.125rem", // text-lg: 18px
      lineHeight: "1.75rem",
    },
    xl: {
      fontSize: "1.25rem", // text-xl: 20px
      lineHeight: "1.75rem",
    },
    "2xl": {
      fontSize: "1.5rem", // text-2xl: 24px
      lineHeight: "2rem",
    },
    "3xl": {
      fontSize: "1.875rem", // text-3xl: 30px
      lineHeight: "2.25rem",
    },
    "4xl": {
      fontSize: "2.25rem", // text-4xl: 36px
      lineHeight: "2.5rem",
    },
    "5xl": {
      fontSize: "3rem", // text-5xl: 48px
      lineHeight: "1",
    },
    "6xl": {
      fontSize: "3.75rem", // text-6xl: 60px
      lineHeight: "1",
    },
    "7xl": {
      fontSize: "4.5rem", // text-7xl: 72px
      lineHeight: "1",
    },
    "8xl": {
      fontSize: "6rem", // text-8xl: 96px
      lineHeight: "1",
    },
    "9xl": {
      fontSize: "8rem", // text-9xl: 128px
      lineHeight: "1",
    },
    // Matching common heading styles
    h1: {
      fontSize: "2.25rem", // Equivalent to text-4xl
      fontWeight: 600,
      lineHeight: "2.5rem",
    },
    h2: {
      fontSize: "1.875rem", // Equivalent to text-3xl
      fontWeight: 600,
      lineHeight: "2.25rem",
    },
    h3: {
      fontSize: "1.5rem", // Equivalent to text-2xl
      fontWeight: 600,
      lineHeight: "2rem",
    },
    h4: {
      fontSize: "1.25rem", // Equivalent to text-xl
      fontWeight: 600,
      lineHeight: "1.75rem",
    },
    h5: {
      fontSize: "1.125rem", // Equivalent to text-lg
      fontWeight: 600,
      lineHeight: "1.75rem",
    },
    h6: {
      fontSize: "1rem", // Equivalent to text-base
      fontWeight: 600,
      lineHeight: "1.5rem",
    },
    body1: {
      fontSize: "1rem", // text-base
      lineHeight: "1.5rem",
    },
    body2: {
      fontSize: "0.875rem", // text-sm
      lineHeight: "1.25rem",
    },
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#110E11",
    },
  },
};

export default createTheme(theme);
