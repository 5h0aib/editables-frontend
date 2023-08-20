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
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        fullWidth
        style={{ width: "100%" }}
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
            fullWidth={{ xs: true, sm: false }}
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