"use client"
import ServiceLayout from "@/components/ServiceLayout"
import { redirect, useRouter } from "next/navigation"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { login } from "@/externalApi"
const Auth = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get("email"))
  const [password, setPassword] = useState("")
  const handleLogin = () => {
    console.log("login creds:", { email, password })
    login({ email, password })
      .then((res) => {
        console.log("log res: ", res)
        // redirect(`user${res?.uid}`, "replace")
        router.push(`user/${res?.uid}`, { shallow: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <ServiceLayout>
      <Typography variant='h4' gutterBottom align='center'>
        We cater to preserve your memories no matter what the device
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack justifyContent='center' spacing={3} sx={{ maxWidth: "600px" }}>
          <Image
            src='/responsiveDevices.png'
            alt='editable studio background image'
            style={{ margin: "0 auto" }}
            width={350}
            height={100}
          />
          <Typography variant='h4' gutterBottom align='center'>
            We cater to preserve your memories no matter what the device
          </Typography>
          <TextField
            placeholder='tomyhatfield@gmail.com'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder='Set password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Link href='services'> */}
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={handleLogin}
          >
            Sign Up
          </Button>
          {/* </Link> */}
          {/* <Button variant='outlined' size='large' fullWidth>
            Signup with Google
          </Button> */}
          {/* <Typography variant="caption" display="block" align="center" gutterBottom>
        step 1 of 4
      </Typography> */}
        </Stack>
      </div>
    </ServiceLayout>
  )
}

export default Auth
