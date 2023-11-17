"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { login, register } from "@/externalApi";
import ServiceLayout from "@/components/ServiceLayout";
import CircularProgress from "@mui/material/CircularProgress";

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    login({ email, password })
      .then((res) => {
        window.localStorage.setItem("uid", res.uid);
        window.localStorage.setItem("access_token", res.access_token);
        window.localStorage.setItem("refresh_token", res.refresh_token);
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("isStaff", res.is_staff);
        if (res.is_staff) {
          console.log("logging in as staff");
          router.push(`admin/all_order`, { shallow: false });
        } else {
          console.log("logging in as client");
          // router.push(`user/${res?.uid}`, { shallow: false });
          router.push(`step_one`, { shallow: false });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // Display error message
        setEmailError("Incorrect email or password");
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

    if (emailError == "" && passwordError == "") {
      setIsLoading(true);
    }

    // Calling the registration API
    register({ email, password })
      .then((res) => {
        setRegistrationResponse(res);
        setIsLoading(false);
        setEmail("")
        setPassword("")
      })
      .catch((err) => {
        setRegistrationResponse("Registration failed. Please try again.");
        setIsLoading(false);
        console.log(err);
      });
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const toggleSignInUp = () => {
    setIsLoading(false);
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
            onKeyPress={handlePasswordKeyPress}
          />
          {isSignIn ? (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          )}
          {registrationResponse && (
            <Typography variant="body2" align="center" style={{ color: "green" }}>
              {registrationResponse}
            </Typography>
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
