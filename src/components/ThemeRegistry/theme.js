import { Roboto,Montserrat } from "next/font/google"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const roboto = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
//   components: {
//     MuiAlert: {
//       styleOverrides: {
//         root: ({ ownerState }) => ({
//           ...(ownerState.severity === 'info' && {
//             backgroundColor: '#60a5fa',
//           }),
//         }),
//       },
//     },
//   },
// });
const button = {
  variants: [
    {
      props: { variant: "outlined" },
      style: {
        // textTransform: 'none',
        border: `2px solid black`,
        fontWeight: "500",
      },
    },
    {
      props: { variant: "contained" },
      style: {
        background: "black",
      },
    },
    {
      props: { large: "true" },
      style: { padding: "18px" },
    },
  ],
  styleOverrides: {
    root: {
      borderRadius: "10px",
      background: "white",
      padding: "12px",
    },
  },
}
const textField = {
  styleOverrides: {
    root: {
      background: "white",
      borderRadius: "10px",
      border: "3px solid black",
    },
  },
}
const paper = {
  styleOverrides: {
    root: {
      background: "white",
      borderRadius: "10px",
      border: "3px solid black",
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
}
let theme = createTheme({
  palette: {
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
  components: {
    MuiButton: button,
    MuiTextField: textField,
    MuiPaper: paper,
  },
})

theme = responsiveFontSizes(theme)

export default theme
