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
    if(isLoggedIn=="true"){
      setIsLoggedIn(false)
      logOut()
    }else{
      router.push(`auth`, { shallow: false })
    }
  }

  console.log("isLoggedIn:", isLoggedIn)
  return (
    <nav className={""}>
      <h1 style={{ textAlign: 'center' }}>Editable Studios</h1>
      <Stack
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='center'
        style={{ marginBottom: "2em" }}
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
