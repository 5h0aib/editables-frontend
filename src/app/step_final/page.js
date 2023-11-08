'use client'
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined"
import React , {useState ,useEffect} from "react"
import Image from 'next/image';
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
import Link from "next/link"
import CircularProgress from '@mui/material/CircularProgress';

import { FileUploader } from "react-drag-drop-files"; 
import JSZip from "jszip";


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

const fileTypes = ["ZIP"]; 
const imgTypes = ["jpg", "jpeg","png"]; 
const StepFinal = () => {

  const [file, setFile] = useState(null); 
  const [fileName, setFileName] = useState("");
  const [hasUnsupportedFiles, sethasUnsupportedFiles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasUnsupportedFiles) {
      alert("One or more files in the ZIP are not supported image formats.");
    }
  }, [hasUnsupportedFiles]);

  const handleChange = (uploadedFile) => {


    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setIsLoading(true);
    sethasUnsupportedFiles(false)

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      console.log("File Content:", content);

      if (uploadedFile.name.endsWith(".zip")) {
        const zip = new JSZip();
        await zip.loadAsync(content);
        const zipFileNamesArray = Object.keys(zip.files).filter((fileName) => {
          return !fileName.startsWith("__MACOSX/");
        });
        console.log(zipFileNamesArray)
        console.log(zipFileNamesArray.length)

        for (const zipFileName of zipFileNamesArray) {
          const fileExtension = zipFileName.split(".").pop();
          if (!imgTypes.includes(fileExtension)) {
            sethasUnsupportedFiles(true)
            setFile(null);
            setFileName("");
            break
          }
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        // setZipFileNames(zipFileNamesArray);
        // setNumZipFiles(zipFileNamesArray.length);
      }
    };
    reader.readAsArrayBuffer(uploadedFile); 
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
          <Paper sx={{ height: "350px" }}>
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

              {isLoading ? ( // Show loading indicator when isLoading is true
               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "250px" }}>
            <CircularProgress size={80} thickness={2}/>
            </div>
          ) : fileName ? (
            // Display uploaded file information
            <div style={{ display: "flex",flexDirection: "column", alignItems: "center", height: "250px" }}>
              <Image
                src="/tick.gif"
                alt="Tick"
                width={120} // Set the width you desire
                height={120} // Set the height you desire
                style = {{ marginTop:"50px" }}
              />
              <Paper sx={{ paddingLeft: "10px" ,marginTop:"20px"}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" gutterBottom>
                    {fileName}
                  </Typography>
                  <Button variant="text" onClick={removeFile}>
                    &#10005;
                  </Button>
                </div>
              </Paper>
            </div>
          ) : (
            // Display BackupOutlinedIcon if no file is selected
            <>
              <BackupOutlinedIcon style={{ fontSize: "130px" }} />
              <Typography variant="body1" gutterBottom style={{ marginTop: "-10px", marginBottom: "18px" }}>
                or
              </Typography>
              <Button variant="outlined" size="medium" style={{ marginTop: "10px" }}>
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
        {/* <Link href='step_one'>
          <Button variant='contained' size='medium'>
            Create new order
          </Button>
        </Link> */}
      </div>
    </ServiceLayout>
  )
}

export default StepFinal
