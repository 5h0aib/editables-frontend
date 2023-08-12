import React from 'react'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
const EmailToSignup = () => {
  return (
    <div>
        <TextField style={{background: "rgba(255, 255, 255,0.1)"}} placeholder='Enter email address' size="small" variant="outlined" />
        <Link href="auth"><Button variant="contained">Start Editing</Button></Link>
    </div>
  )
}

export default EmailToSignup