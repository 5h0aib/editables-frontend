"use client"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

import {
logOut
} from "@/externalApi"

const drawerWidth = 240
const navItems = ["all order", "transaction"]

function AdminLayout(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const router = useRouter()
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Admin Panel
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => router.push(item.replace(/ /g, '-'), { shallow: true })}
            >
              <ListItemText primary={capitalizeFirstLetter(item)} />
            </ListItemButton>
          </ListItem>
        ))}



        <ListItem key={"logOut"} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={logOut}
            >
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>

      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex", borderRadius: "0" }} p={2}>
      <CssBaseline />
      <AppBar component='nav' sx={{ borderRadius: "0", padding: "0px" }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Admin Panel
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} variant="contained" onClick={() => router.push(item.replace(/ /g, '-'), { shallow: true })}>
               {capitalizeFirstLetter(item)}
              </Button>
            ))}

                    <Button key={"Log Out"} variant="contained" onClick={logOut}>
                      Log Out
                    </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

export default AdminLayout
