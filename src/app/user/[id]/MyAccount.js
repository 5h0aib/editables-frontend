"use client"
import { getUserDetails, putUserDetails } from "@/externalApi"
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"

const MyAccount = () => {

  
  const [userData, setUserData] = useState({})
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  useEffect(() => {
    getUserDetails()
      .then((user) => {
        setUserData(user)
      })
      .catch((err) => console.log(err))
  }, [])


  const handleSave = () => {
    console.log(userData)
    putUserDetails(userData)//make this dynamic
  }




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
              setUserData({ ...userData, full_name: e.target.value })
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
              setUserData({ ...userData, phone_number: e.target.value })
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
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          ></TextField>
        </Grid>


        {showPasswordFields && (
          <>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Password
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Confirm new password
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
        </>
        )}
      </Grid>
      <br />


      <Typography
        variant='caption'
        gutterBottom
        display={"block"}
        onClick={() => {setShowPasswordFields(!showPasswordFields)}}
        style={{ cursor: 'pointer', color: '#5F9EA0' }}
      >
        *Change Password
      </Typography>



      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) =>
              setUserData({ ...userData, newsletter_opt_in: e.target.checked })
            }
            defaultValue={userData?.newsletter_opt_in}
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
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default MyAccount
