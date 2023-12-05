"use client"
import React, { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Stack} from "@mui/material/"
import Link from "next/link"
import { logOut,isAuthenticated } from "@/externalApi"
import { Link as ScrollLink } from 'react-scroll';

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
    <nav>
      {/* <h1 style={{ textAlign: 'center' }}>Editable Studios</h1> */}
      <Stack
        spacing={4}
        direction='row'
        alignItems='center'
        justifyContent='center'
        // style={{ marginBottom: "1em" }}
      >
        
        <Link href='/'>Home</Link>
        <Link href='#'>About</Link>

        
        <ScrollLink to="contact" smooth={true} duration={3000} style={{ cursor:"pointer" }}>
        Contact
        </ScrollLink>

        {isLoggedIn==true ?<Link href={`user/${localStorage.getItem('uid')}`}  onClick={()=>{router.push(`user/${localStorage.getItem('uid')}`, { shallow: false })}}>Dashboard</Link>: ""}
        <Button  onClick={handleClick}>{isLoggedIn==true ? "Logout" : "Login"}</Button>
      </Stack>
    </nav>
  )
}

export default Nav
