"use client"
import React, { useState } from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"
const EmailToSignup = () => {
  const [emailAddress, setEmail] = useState()
  return (
    <>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Ready to start editing? Sign up with your email address
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        defaultValue={emailAddress}
        spacing={2}
        fullWidth
        style={{ width: "100%" }}
        justifyContent={"center"}
      >
        <TextField
          style={{ maxWidth: "600px" }}
          placeholder='Enter email address'
          onChange={(e) => setEmail(e.target.value)}
          size='normal'
          variant='outlined'
          fullWidth
        />
        <Link href={`auth?email=${emailAddress}`}>
          <Button
            variant='contained'
            large
            fullWidth={{ xs: true, sm: false }}
            style={{ whiteSpace: "nowrap" }}
          >
            Start Editing
          </Button>
        </Link>
      </Stack>
    </>
  )
}

export default EmailToSignup
