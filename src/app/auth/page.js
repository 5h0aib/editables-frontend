
import ServiceLayout from '@/components/ServiceLayout'
import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Auth = () => {
  return (
    <ServiceLayout>
      <Stack justifyContent="center" spacing={3}>
        <Typography variant="h4" gutterBottom>
        We cater to preserve your memories no matter what the device
        </Typography>
        <Image
          src="/responsiveDevices.png"
          alt='editable studio background image'
          style={{margin:"0 auto"}}
          // layout='fill'
          // objectFit='cover'
          // objectPosition='center'
          width={350}
          height={100}
        />
        <Link href="services"><Button variant='contained'>Sign Up</Button></Link>
        {/* <Typography variant="caption" display="block" align="center" gutterBottom>
        step 1 of 4
      </Typography> */}
      </Stack>
    </ServiceLayout>
  )
}

export default Auth