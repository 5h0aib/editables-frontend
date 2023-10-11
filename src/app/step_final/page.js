import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined"
import React from "react"
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { categories, styles } from "@/hardCode/all_style_catergories"
import Link from "next/link"
import { Height } from "@mui/icons-material"

const StepFinal = () => {
  return (
    <ServiceLayout
      formTitle='Choose the category & style that fits your images'
      subLines=''
      step=''
    >
      <SplitLayout>
        <div>
          <Stack
            direction='row'
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant='h6' gutterBottom>
              Album Title
            </Typography>
            <Typography variant='caption' gutterBottom>
              0/100 characters
            </Typography>
          </Stack>
          <TextField variant='outlined' fullWidth />
          <Stack
            direction='row'
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant='h6' gutterBottom>
              Description
            </Typography>
            <Typography variant='caption' gutterBottom>
              0/300 characters
            </Typography>
          </Stack>
          <TextField variant='outlined' fullWidth />
          <Typography variant='h6' gutterBottom>
            File type you would like to receive
          </Typography>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <FormControlLabel value='jpeg' control={<Radio />} label='JPEG' />
            <FormControlLabel
              value='lightroom'
              control={<Radio />}
              label='Lightroom catalogue'
            />
            <FormControlLabel
              value='captured'
              control={<Radio />}
              label='Captured catalogue'
            />
          </RadioGroup>
        </div>
        <Paper sx={{ height: "100%" }}>
          <div style={{ border: "1px dashed 5px", textAlign: "center",padding:"20px" }}>
            <Typography variant='h5' gutterBottom>
              <b>Drag & drop images here</b>
            </Typography>

            <BackupOutlinedIcon style={{ fontSize: "130px" }} />

            <Typography variant='body1' gutterBottom style={{marginTop:"-10px",marginBottom:"18px"}}>
              or
            </Typography>
            <Button variant='outlined' size='large'>
              Upload files
            </Button>
          </div>
        </Paper>
      </SplitLayout>
      <Link href='user/123'>
        <Button variant='contained' size='large'>
          Save & go to dashboard
        </Button>
      </Link>
      <Link href='step_one'>
        <Button variant='contained' size='large'>
          Create new order
        </Button>
      </Link>
    </ServiceLayout>
  )
}

export default StepFinal
