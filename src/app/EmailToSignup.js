"use client"
import React, { useState } from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"

const EmailToSignup = () => {


  const [emailAddress, setEmail] = useState()
  const [isValidEmail, setValidEmail] = useState(true);



  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    setValidEmail(!validateEmail(e));
  };


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
          onChange={(e) => handleEmailChange(e.target.value)}
          size='normal'
          variant='outlined'
          fullWidth
        />
        <Link href={`auth?email=${emailAddress}`}>
          <Button
            variant='contained'
            size="small"
            fullWidth={{ xs: true, sm: false }}
            style={{ whiteSpace: "nowrap",marginTop:"5px" }}
            disabled={isValidEmail}
          >
            Start Editing
          </Button>
        </Link>
      </Stack>
    </>
  )
}

export default EmailToSignup
