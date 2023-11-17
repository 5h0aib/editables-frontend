"use client"
import { getUserDetails, putUserDetails } from "@/externalApi"
import {
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  Grid,
  TextField,
  Box,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAccount = () => {

  
  const [userData, setUserData] = useState({})
  const [updateUserData, setUpdateUserData] = useState({})
  const [updateUserPassword, setUpdateUserPassword] = useState({})
  const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [isSaved, setIsSaved] = useState(false);


  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);


  const [newsletterOptIn, setNewsletterOptIn] = useState(false);



  const [toastMessage, setToastMessage] = useState("password")
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("primary");


  useEffect(() => {
    getUserDetails()
      .then((user) => {
        setUserData(user)
        setNewsletterOptIn(user.newsletter_opt_in)
      })
      .catch((err) => console.log(err))
  }, [])


  const handleSave = () => {
    
    if (Object.keys(updateUserData).length > 0) {
      putUserDetails(updateUserData)
        .then((data) => {
          setToastMessage("User Data Updated")
          setOpen(true)
          // setIsSaved(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error uploading data:", error);
        });
    }
  }

  const savePassword = () => {
    if (password !== confirmPassword && password.length < 8) {
      setPasswordError("Passwords do not match");
      return;
    }
    setIsChangingPassword(true); 

    setTimeout(() => {
      putUserDetails(updateUserPassword)
        .then(() => {
          setToastMessage("Password changed successfully")
          setOpen(true)
        })
        .catch((error) => {
          setPasswordChangeSuccess("Something went wrong");
          console.error("Error uploading data:", error);
        })
        .finally(() => {
          setTimeout(() => {
            setOpen(false)
            setPassword("")
            setConfirmPassword("")// Emptying the fields
            setIsChangingPassword(false); // Hiding the CircularProgress after 2 seconds
            setPasswordDialogOpen(false); // Close the dialog
          }, 2000);
        });
    }, 1000);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Add password validation logic here
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if passwords match and clear any previous error
    if (newConfirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setUpdateUserPassword({ password: password })
      setPasswordError("");
    }
  };


  return (
    <div>
      <Typography variant='h5' gutterBottom display={"block"}>
        Personal Information
      </Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Full Name
          </Typography>
          <TextField
            fullWidth
            defaultValue={userData?.full_name}
            onChange={(e) =>
              setUpdateUserData({ ...updateUserData, full_name: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Email address
          </Typography>
          <TextField
            fullWidth
            disabled
            defaultValue={userData?.email}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Phone number
          </Typography>
          <TextField
            fullWidth
            defaultValue={userData?.phone_number}
            onChange={(e) =>
              setUpdateUserData({ ...updateUserData, phone_number: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Bio
          </Typography>
          <TextField
            fullWidth
            defaultValue={userData?.bio}
            onChange={(e) => setUpdateUserData({ ...updateUserData, bio: e.target.value })}
          ></TextField>
        </Grid>

      </Grid>
      <br />
      <Typography
        variant='caption'
        gutterBottom
        display={"block"}
        onClick={() => {setPasswordDialogOpen(true)}}
        style={{ cursor: 'pointer', color: '#5F9EA0' }}
      >
        *Change Password
      </Typography>



      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setNewsletterOptIn(e.target.checked);
              setUpdateUserData({ ...updateUserData, newsletter_opt_in: e.target.checked });
            }}
            checked={newsletterOptIn}
          />
        }
        label='Receive email notifications about referrals & coupon codes from Editable Studios?'
      />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant='contained'
          size='large'
          style={{ minWidth: "33vw" }}
          onClick={handleSave}
          disabled={Object.keys(updateUserData).length === 0}
        >
          Save Changes
        </Button>
      </div>

      {/* {isSaved && (
        <Typography variant="body1" style={{ color: "green", marginTop: "10px" }}>
          Your changes have been updated
        </Typography>
      )} */}



      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
        }}
        maxWidth="sm"
      >
        <Box p={4} style={{ overflow: "hidden", width: "400px" }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Typography
            variant="p"
            gutterBottom
            display={"block"}
            style={{ marginTop: "10px" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <Typography variant="caption" style={{ color: "red" }}>
              {passwordError}
            </Typography>
          )}
          <Typography
            variant="p"
            gutterBottom
            display={"block"}
            style={{ marginTop: "20px" }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            {isChangingPassword ? (
              <CircularProgress size={24}  style={{ marginTop:"10px" ,marginRight:"20px"}}/>
            ) : (
              <Button onClick={savePassword}>Save</Button>
            )}
          </Box>
          {passwordChangeSuccess && (
            <Typography
              variant="body1"
              style={{ color: passwordChangeSuccess === "Password changed successfully" ? "green" : "red", marginTop: "10px" }}
            >
              {passwordChangeSuccess}
            </Typography>
          )}
        </Box>
      </Dialog>



      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={alertSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>

    </div>
  )
}

export default MyAccount
