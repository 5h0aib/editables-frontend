'use client'
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined"
import React , {useState} from "react"
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

import { FileUploader } from "react-drag-drop-files"; 


// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyD7EuPzWXUjBm0-VN8fiOXp07yADLhF9Bo",
//   authDomain: "editables-firebase.firebaseapp.com",
//   projectId: "editables-firebase",
//   storageBucket: "editables-firebase.appspot.com",
//   messagingSenderId: "925746479162",
//   appId: "1:925746479162:web:8a965d894da0e12035f503",
//   measurementId: "G-HZMTEYFMZS"
// };

// const app = initializeApp(firebaseConfig);

const fileTypes = ["JPG","ZIP"]; 
const StepFinal = () => {
  const [file, setFile] = useState(null); 
  const [fileName, setFileName] = useState("");
  const handleChange = file => { 
    setFile(file); 
    console.log(file)
    setFileName(file.name);

  }; 
  const removeFile = () => {
    setFile(null);
    setFileName("");
  };

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



        <FileUploader  
        handleChange={handleChange}  
        name="file" 
        types={fileTypes}> 
          <Paper sx={{ height: "100%" }}>
            <div
              style={{
                border: "1px dashed 5px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <Typography variant='h5' gutterBottom>
                <b>Drag & drop your zip file here</b>
              </Typography>

              {/* <BackupOutlinedIcon style={{ fontSize: "130px" }} /> */}

              {fileName ? (
               
                   
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <Paper sx={{ paddingLeft:"10px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" gutterBottom>
                          {fileName}
                        </Typography>
                        <Button variant="text" onClick={removeFile}>
                          &#10005; {/* Display a cross (delete) icon */}
                        </Button>
                      </div>
                      </Paper>
                    </div>
                    
      
                  ) : (
                    // Display BackupOutlinedIcon if no file is selected
                    <>
                      <BackupOutlinedIcon style={{ fontSize: "130px" }} />
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ marginTop: "-10px", marginBottom: "18px" }}
                      >
                        or
                      </Typography>
                      <Button variant='outlined' size='medium' style={{ marginTop:"10px" }}>
                        Upload files
                      </Button>
                    </>
                  )}
            </div>
          </Paper>
        </FileUploader>



      </SplitLayout>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center",marginTop: "20px"}}>
        <Link href='user/123'>
          <Button variant='contained' size='medium'>
            Save & go to dashboard
          </Button>
        </Link>
        <Link href='step_one'>
          <Button variant='contained' size='medium'>
            Create new order
          </Button>
        </Link>
      </div>
    </ServiceLayout>
  )
}

export default StepFinal
