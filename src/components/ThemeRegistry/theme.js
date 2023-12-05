import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({

  palette: {
    mode: 'light',
    primary: {
      main: "rgba(0,0,0,1)",
      light: "rgba(0,0,0,1)",
      dark: "rgba(0,0,0,1)",
      contrastText: "white",
    },
    secondary: {
      main: "#f4f4f8",
    },
    gray: {
      main: "#E0E0E0",
      light: "#EDEDED",
      dark: "#A1A1A1",
      contrastText: "#616161",
    },
  },
  typography: {
    button:{
      textTransform : "none"
    },
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            fontFamily: poppins.style.fontFamily,
            border: `2px solid black`,
            fontWeight: "500",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            fontFamily: poppins.style.fontFamily,
            background: "black",
          },
        },
        {
          props: { large: "true" },
          style: { fontFamily: poppins.style.fontFamily, padding: "18px" },
        },

      ],
      styleOverrides: {
        root: {
          fontFamily: poppins.style.fontFamily,
          borderRadius: "10px",
          background: "white",
          padding: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: poppins.style.fontFamily,
          background: "white",
          borderRadius: "5px",
          border: ".5px solid #CBCBCB",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: poppins.style.fontFamily,
          background: "white",
          borderRadius: "10px",
          border: "1px solid black",
        },
      },
      variants: [
        {
          props: { color: "gray" },
          style: { background: "#f4f4f8" },
        },
        {
          props: { padding: "true" },
          style: { padding: "20px" },
        },
      ],
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
