"use client"
import React, { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Stack} from "@mui/material/"
import Link from "next/link"
import { logOut } from "@/externalApi"

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if "localStorage" is available (client-side) before using it
    if (typeof window !== 'undefined') {
      const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn) {
        setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      }
    }
  }, []);


  const router = useRouter();

  const handleClick = () => {
    if(isLoggedIn==true){
      setIsLoggedIn(false)
      logOut()
    }else{
      router.push(`auth`, { shallow: false })
    }
  }

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
        <Button  onClick={handleClick}>{isLoggedIn==true ? "Logout" : "Login/Signup"}</Button>
      </Stack>
    </nav>
  )
}

export default Nav
