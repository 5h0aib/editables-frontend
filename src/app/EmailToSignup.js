import React from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"
const EmailToSignup = () => {
  return (
    <>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Ready to start editing? Sign up with your email address
      </Typography>
      <Stack
        direction={"row"}
        spacing={2}
        fullWidth
        style={{ maxWidth: "90vw" }}
        justifyContent={"center"}
      >
        <TextField
          style={{ maxWidth: "600px" }}
          placeholder='Enter email address'
          size='normal'
          variant='outlined'
          fullWidth
        />
        <Link href='auth'>
          <Button
            variant='contained'
            size='large'
            style={{ whiteSpace: "nowrap", padding: "15px" }}
          >
            Start Editing
          </Button>
        </Link>
      </Stack>
    </>
  )
}

export default EmailToSignup
