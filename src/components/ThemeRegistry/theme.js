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
const button = {
  // variants: [
  //   {
  //     props: { variant: 'dashed' },
  //     style: {
  //       textTransform: 'none',
  //       border: `2px dashed ${blue[500]}`,
  //     },
  //   },
  //   {
  //     props: { variant: 'dashed', color: 'secondary' },
  //     style: {
  //       border: `4px dashed ${red[500]}`,
  //     },
  //   },
  // ],
  styleOverrides: {
    root: {
      borderRadius: "10px",
    },
  },
}
const textField = {
  styleOverrides: {
    root: {
      background: "white",
      borderRadius: "10px",
    },
  },
}
const paper={
  styleOverrides: {
    root: {
      background: "white",
      borderRadius:"10px",
      border:"3px solid black",
      padding:"20px"
    },
  },
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
    MuiPaper: paper
  },
})

theme = responsiveFontSizes(theme)

export default theme
