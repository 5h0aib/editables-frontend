import { Roboto } from "next/font/google"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const roboto = Roboto({
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
let theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0,0,0,1)",
      light: "rgba(0,0,0,1)",
      dark: "rgba(0,0,0,1)",
      contrastText: "white",
    },
    secondary: {
      main: "#E0E0E0",
    },
    gray: {
      main: "#E0E0E0",
      light: "#EDEDED",
      dark: "#A1A1A1",
      contrastText: "#616161",
    },
  },
})

// theme = responsiveFontSizes(theme)

export default theme
