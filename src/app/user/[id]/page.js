// "use client"
import { Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
const User = ({params}) => {
  return (
    <div>
        <Stack direction="row" >
          <div style={{background:"black", width:"300px", color:"white", height:"100vh"}}>
            <Stack spacing={2} style={{padding:"20px"}}>
                <Image
              src="/man.png"
              alt='editable studio background image'
              style={{margin:"0 auto"}}
              // layout='fill'
              // objectFit='cover'
              // objectPosition='center'
              width={100}
              height={100}
            />
            <span>User Dash, id: {params.id}</span>
            </Stack>
    
            
          </div>
          <div>

          </div>

        </Stack>
        
    </div>
  )
}

export default User