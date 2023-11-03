"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { login } from "@/externalApi";
import ServiceLayout from "@/components/ServiceLayout";

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // A state to track whether the user is signing in or signing up

  const handleLogin = () => {
    login({ email, password })
      .then((res) => {
        window.localStorage.setItem("uid", res.uid);
        window.localStorage.setItem("access_token", res.access_token);
        window.localStorage.setItem("refresh_token", res.refresh_token);
        window.localStorage.setItem("isLoggedIn", true);
        if (res.is_staff) {
          console.log("logging in as staff");
          router.push(`admin/all_order`, { shallow: false });
        } else {
          console.log("logging in as client");
          router.push(`user/${res?.uid}`, { shallow: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = () => {
    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError(""); // Clear the error message
    }

    // Password validation (you can add more criteria as needed)
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError(""); // Clear the error message
    }
    // Calling the registration API
    // register({ email, password })
    //   .then((res) => {
    //     // Handle the registration success
    //     // You can also consider automatically logging in the user here
    //     console.log("Registration successful");
    //   })
    //   .catch((err) => {
    //     // Handle registration errors
    //     console.log(err);
    //   });
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const toggleSignInUp = () => {
    setIsSignIn(!isSignIn); // Toggle between signing in and signing up
  };

  return (
    <ServiceLayout>
      <Typography variant="h4" gutterBottom align="center">
        We cater to preserve your memories no matter what the device
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack justifyContent="center" spacing={3} sx={{ maxWidth: "600px" }}>
          <Image
            src="/responsiveDevices.png"
            alt="editable studio background image"
            style={{ margin: "0 auto" }}
            width={350}
            height={100}
          />
          <Typography variant="h4" gutterBottom align="center">
            We cater to preserve your memories no matter what the device
          </Typography>
          <TextField
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError !== ""}
            helperText={emailError}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError !== ""}
            helperText={passwordError}
            onKeyPress={handlePasswordKeyPress} // Call handleLogin on Enter key press
          />
          {isSignIn ? (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSignUp} // Call handleSignUp when signing up
            >
              Sign Up
            </Button>
          )}
          <Typography variant="body1" align="center">
            {isSignIn ? "Don't have an account yet? " : "Already have an account? "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={toggleSignInUp}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </span>
          </Typography>
        </Stack>
      </div>
    </ServiceLayout>
  );
};

export default Auth;


