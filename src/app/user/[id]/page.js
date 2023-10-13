"use client"
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material"
import Image from "next/image"
import InboxIcon from "@mui/icons-material/Inbox"
import React, {  useState } from "react"
import MyAccount from "./MyAccount"
import AllOrders from "./AllOrders"
import Link from "next/link"
import { useRouter } from "next/navigation"

const User = ({ params }) => {
  const [state, setState] = useState("allOrders")
  const router = useRouter()

  return (
    <div>
      <Stack direction='row'>
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
                    <InboxIcon color='white' />
                  </ListItemIcon>
                  <ListItemText primary='Place new order' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setState("myAccount")}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary='My account' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setState("allOrders")}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary='All orders' />
                </ListItemButton>
              </ListItem>
              <Divider />
              {/* <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Help Center' />
                </ListItemButton>
              </ListItem>
              <Divider /> */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Stack>
        </div>
        <div style={{ padding: "30px", width: "100%" }}>
          {state == "myAccount" && <MyAccount />}
          {state == "allOrders" && <AllOrders />}
        </div>
      </Stack>
    </div>
  )
}

export default User
