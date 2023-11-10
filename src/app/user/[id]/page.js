"use client"
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Hidden
} from "@mui/material"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import MyAccount from "./MyAccount"
import AllOrders from "./AllOrders"

import { useRouter } from "next/navigation"
import { logOut } from "@/externalApi"

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


import EditNoteIcon from '@mui/icons-material/EditNote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';


const User = ({ params }) => {
  const router = useRouter()
  const [value, setValue] = React.useState(2);


  return (
    <div>
      <Stack direction='row'>
      <Hidden smDown>
        <div
          style={{
            background: "#A9A9A9",
            width: "300px",
            color: "white",
            height: "100vh",
          }}
        >
          <Stack spacing={2} style={{ padding: "20px" }}>
            <Image
              src='/man.png'
              alt='editable studio background image'
              style={{ margin: "0 auto" }}
              width={100}
              height={100}
            />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => router.push("/step_one", { shallow: false })}
                >
                  <ListItemIcon>
                    <EditNoteIcon color='white' />
                  </ListItemIcon>
                  <ListItemText primary='Place new order' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setValue(1)}>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary='My account' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setValue(2)}>
                  <ListItemIcon>
                    <FormatListNumberedIcon />
                  </ListItemIcon>
                  <ListItemText primary='All orders' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={logOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Stack>
        </div>
        </Hidden>
        <div style={{ padding: "30px", width: "100%" }}>
            {value === 1 && <MyAccount />}
            {value === 2 && <AllOrders />}
        </div>


        <Hidden smUp>
          {/* Bottom Navigation (Hidden for screens below smUp) */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "#A9A9A9",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
           <Box sx={{ width: "100%" }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="New Order" icon={<EditNoteIcon />}  onClick={() => router.push("/step_one", { shallow: false })}/>
                <BottomNavigationAction label="Account" icon={<AccountBoxIcon />} />
                <BottomNavigationAction label="All Orders" icon={<FormatListNumberedIcon />} />
                <BottomNavigationAction label="Log Out" icon={<LogoutIcon />} onClick={logOut}/>
              </BottomNavigation>
            </Box>
          </div>
        </Hidden>




      </Stack>
    </div>
  )
}

export default User
