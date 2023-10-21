"use client"
import { createBooking } from "@/externalApi"
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"

const ContactOverlay = ({ setOpen, open, }) => {
  const [phone, setPhone] = useState("")
  const handleClick = () => {
    createBooking(phone)
      .then((res) => {
        console.log("response: ", res)
        setOpen(false)
        router.push(`user/${localStorage.getItem("uid")}`, { shallow: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent>
        <Stack justifyContent='center' spacing={3} sx={{ maxWidth: "350px" }}>
          <Typography variant='h6' gutterBottom align='center'>
            Please provid these personal informations to proceed with the order
          </Typography>
          <TextField
            placeholder='Your Contact Number'
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* <Link href='services'> */}
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={handleClick}
          >
            Next
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ContactOverlay
