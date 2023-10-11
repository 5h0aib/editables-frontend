import React from "react"
import { Button, Grid, TextField, Typography } from "@mui/material"
const Step2 = () => {

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography variant='body1' gutterBottom sx={{ float: "left" }}>
          <b>Album Title</b>
        </Typography>
        <Typography variant='caption' sx={{ float: "right" }} gutterBottom>
          0/100 characters
        </Typography>
        <TextField fullWidth />
        <div
          style={{
            display: "inline-grid",
            alignItems: "center",
            gap: "10px",
            gridTemplateColumns: "max-content max-content 1fr",
          }}
        >
          <Typography variant='body1' gutterBottom>
            <b>Album Title</b>
          </Typography>
          <Typography variant='caption' gutterBottom>
            (optional)
          </Typography>
          <Typography
            variant='caption'
            gutterBottom
            style={{ justifySelf: "end", float: "right" }}
          >
            0/300 characters
          </Typography>
        </div>
        <TextField fullWidth multiline minRows={3} />
        <Typography variant='body1' gutterBottom sx={{ float: "left" }}>
          <b>File type you would like to receive</b>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ border: "1px dashed 5px" }}>
          <Typography variant='body1' gutterBottom>
            <b>Drag & drop images here</b>
          </Typography>
          <span>ICON</span>
          <Typography variant='body1' gutterBottom >
            or
          </Typography>
          <Button variant="outlined" size="large">Upload files</Button>
        </div>
      </Grid>
      <Grid item xs={12} alignSelf={"center"}>
        <Button variant='contained' size="large">Next</Button>
      </Grid>
    </Grid>
  )
}

export default Step2
