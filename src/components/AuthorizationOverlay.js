"use client"
import { login } from "@/externalApi"
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"

const AuthorizationOverlay = ({
  setOpen,
  open,
  isCustom,
  setOpenCustom,
  hRef,
}) => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  
  const handleClick = () => {
    // console.log("login creds:", { email, password })
    login({ email, password })
      .then((res) => {
        console.log("log res: ", res)
        localStorage.setItem("uid", res.uid)
        localStorage.setItem("access_token", res.access_token)
        localStorage.setItem("refresh_token", res.refresh_token)
        localStorage.setItem("isLoggedIn", true)
        if (res.is_staff) {
          console.log("loging in as staff")
          router.push(`admin/all_order`, { shallow: false })
        } else {
          window.location.reload();
          // if (isCustom) {
          //   setTimeout(function () {
          //     setOpenCustom(true)
          //   }, 1000)
          //   setOpen(false)
          // }
          // setOpen(false)
          // router.push(hRef, { shallow: false })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    return () => {
      console.log("open the phone number modal")
    }
  }, [])


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // If Enter key is pressed, trigger the "Next" button click
      handleClick();
    }
  };
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent>
        <Stack justifyContent='center' spacing={3} sx={{ maxWidth: "400px" }} p={4}>
          <Typography variant='h4' gutterBottom align='center' style={{fontSize: "25px"}}>
              Finish setting up your account 
          </Typography>
          <Typography variant='h6' align='center' style={{fontSize: "15px"}}>
              Sign in with your email and password
          </Typography>

          <TextField
            placeholder='tomyhatfield@gmail.com'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder='Set password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* <Link href='services'> */}
          <Button
            variant='contained'
            size='large'
            // fullWidth
            onClick={handleClick}
          >
            Next
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default AuthorizationOverlay
