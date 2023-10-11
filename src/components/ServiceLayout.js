"use client"
import React from "react"
import Nav from "./Nav"
import { Stack, Typography } from "@mui/material"
import Link from "next/link"

const ServiceLayout = ({ children, formTitle, subLines }) => {
  return (
    <div style={{ padding: "2em" }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link href='/'>
          <span>back</span>
        </Link>
        <Nav />
        <span>Sign In</span>
      </Stack>
      <div style={{ padding: "2em 0" }}>
        <Typography variant='h4' gutterBottom>
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
