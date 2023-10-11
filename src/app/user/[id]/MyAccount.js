import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"

const MyAccount = () => {
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
            Personal Information
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Email address
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Phone number
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
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
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='p' gutterBottom display={"block"}>
            Bio
          </Typography>
          <TextField fullWidth></TextField>
        </Grid>
      </Grid>
      <br />
      <Typography variant='caption' gutterBottom display={"block"}>
        *Select to change
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label='Receive email notifications about referrals & coupon codes from Editable Studios?'
      />
      <br/>
      <br/>
      <div style={{display:"flex" , justifyContent:"center"}}>
      <Button variant='contained' size='large' style={{ minWidth: "33vw" }}>
        Save Changes
      </Button>
      </div>
    </div>
  )
}

export default MyAccount
