"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Stack, Typography } from "@mui/material/"
import Link from "next/link"
import { logOut } from "@/externalApi"

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  )

  const router = useRouter()
  const handleClick = () => {
    isLoggedIn=="true" ? logOut() : router.push(`auth`, { shallow: false })
  }
  // localStorage.setItem("isLoggedIn", true)
  console.log("isLoggedIn:", isLoggedIn)
  return (
    <nav className={""}>
      <Stack
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='center'
        style={{ marginBottom: "3em" }}
      >
        <Link href='/'>Home</Link>
        <Link href='#'>About</Link>
        <Link href='#'>Contact</Link>
        <Button  onClick={handleClick}>{isLoggedIn=="true" ? "Logout" : "Login"}</Button>
      </Stack>
    </nav>
  )
}

export default Nav
