"use client"
import React from "react"
import Nav from "./Nav"
import { Stack, Typography } from "@mui/material"
import Link from "next/link"

const ServiceLayout = ({ children, formTitle, subLines }) => {
  return (
    <div style={{ padding: "2em"}}>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        <Nav />
      </Stack>
      <div style={{ padding: "2em 0", marginTop:"20px" }}>
        <Typography variant='h4' gutterBottom style={{ marginBottom:"50px", fontWeight:"500", paddingLeft:"16px"}}>
          {formTitle}
        </Typography>
        {subLines&&subLines?.map((line,i) => (
          <Typography key={i} variant='body1' gutterBottom>
            {line}
          </Typography>
        ))}
        {children}
      </div>
    </div>
  )
}

export default ServiceLayout
