
import ServiceLayout from '@/components/ServiceLayout'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Services = () => {
  return (
    <ServiceLayout>
        <div>
          <h4>Services</h4>
          <Link href="basic"><Button contained>Basic</Button></Link>
          <Link href="express"><Button contained>Express</Button></Link>
          <Link href="custom"><Button contained>Custom</Button></Link>
        </div>
    </ServiceLayout>
  )
}

export default Services