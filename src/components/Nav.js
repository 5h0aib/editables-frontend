"use client"
import React, { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Stack} from "@mui/material/"
import Link from "next/link"
import { logOut,isAuthenticated } from "@/externalApi"

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    isAuthenticated()
    .then((data) => {
      setIsLoggedIn(data)
    })
    .catch((err) => {
      setIsLoggedIn(false)
    })
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
      {/* <h1 style={{ textAlign: 'center' }}>Editable Studios</h1> */}
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
        {isLoggedIn==true ?<Link href={`user/${localStorage.getItem('uid')}`}  onClick={()=>{router.push(`user/${localStorage.getItem('uid')}`, { shallow: false })}}>Dashboard</Link>: ""}
        <Button  onClick={handleClick}>{isLoggedIn==true ? "Logout" : "Login/Signup"}</Button>
      </Stack>
    </nav>
  )
}

export default Nav
