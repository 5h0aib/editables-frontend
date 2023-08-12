"use client"
import React from "react"
import Nav from "./Nav"
import { Stack } from "@mui/material"
import Link from "next/link"

const ServiceLayout = ({ children }) => {
  return (
    <div style={{ padding: "2em" }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link href="/"><span>back</span></Link>
        <Nav />
        <span>Sign In</span>
      </Stack>
      <div style={{ padding: "2em 0" }}>
      {children}
      </div>
    </div>
  )
}

export default ServiceLayout
