
import React from "react"
// import styles from './components.module.css'
import { Stack, Typography } from "@mui/material/"
import Link from "next/link"

const Nav = () => {
  console.log("nav changed")
  return (
    <nav className={""}>
      <Stack
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='center'
        style={{marginBottom:"3em"}}
      >
        <Link href='/'>Home</Link>
        <Link href='#'>About</Link>
        <Link href='#'>Contact</Link>
        <Link href='/auth'>Login</Link>
      </Stack>
    </nav>
  )
}

export default Nav
