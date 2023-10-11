'use client'
import ServiceLayout from "@/components/ServiceLayout"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useSearchParams } from 'next/navigation'
const Auth = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
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
          <TextField placeholder='tomyhatfield@gmail.com' defaultValue={email} />
          <TextField placeholder='Set password' />
          <Link href='services'>
            <Button variant='contained' size='large' fullWidth>
              Sign Up
            </Button>
          </Link>
          <Button variant='outlined' size='large' fullWidth>
            Signup with Google
          </Button>
          {/* <Typography variant="caption" display="block" align="center" gutterBottom>
        step 1 of 4
      </Typography> */}
        </Stack>
      </div>
    </ServiceLayout>
  )
}

export default Auth
