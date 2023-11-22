"use client"
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Hidden
} from "@mui/material"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import MyAccount from "./MyAccount"
import AllOrders from "./AllOrders"

import { useRouter } from "next/navigation"
import { logOut } from "@/externalApi"

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';


import EditNoteIcon from '@mui/icons-material/EditNote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import { FileUploader } from "react-drag-drop-files"; 

import { getUserDetails, putUserDetails } from "@/externalApi"

import { initializeApp} from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7EuPzWXUjBm0-VN8fiOXp07yADLhF9Bo",
  authDomain: "editables-firebase.firebaseapp.com",
  projectId: "editables-firebase",
  storageBucket: "editables-firebase.appspot.com",
  messagingSenderId: "925746479162",
  appId: "1:925746479162:web:8a965d894da0e12035f503",
  measurementId: "G-HZMTEYFMZS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileTypes = ["JPG","PNG","JPEG"]; 


const User = ({ params }) => {
  const router = useRouter()
  const [value, setValue] = React.useState(2);
  const [fullPageHeight, setFullPageHeight] = useState(0);

  const [notificationNum , setNotificationNum] = useState(0);

  const [profileImage , setProfileImage] = useState('/man.png')
  const [userData, setUserData] = useState({})
  



  useEffect(() => {

    getUserDetails()
      .then((user) => {
        console.log(user)
        setUserData(user)
        setProfileImage(user.thumbnail_url || "/man.png");
      })
      .catch((err) => console.log(err))

    const updateFullPageHeight = () => {
      const newHeight = document.documentElement.scrollHeight;
      setFullPageHeight(newHeight);
    };
  
    if (typeof document !== 'undefined') {

      const timeoutId = setTimeout(() => {
        updateFullPageHeight();
        window.addEventListener('resize', updateFullPageHeight);
      }, 2000);
  
      return () => {
        clearTimeout(timeoutId);
  
        if (typeof document !== 'undefined') {
          window.removeEventListener('resize', updateFullPageHeight);
        }
      };
    }
  }, []);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleEditButtonClick = () => {
    // Trigger file input click
    document.getElementById("fileInput").click();
  };


  const handleChange = (uploadedFile) => {
    if (uploadedFile){
      const storageRef = ref(storage, `user_profile_images/${localStorage.getItem("uid")}/${uploadedFile.name}`);

      uploadBytes(storageRef, uploadedFile)
          .then((snapshot) => {
              console.log("Upload Successfull");
              return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
              setProfileImage(downloadURL);


              putUserDetails({ thumbnail_url: downloadURL })
              .then((data) => {
                
              })
              .catch((error) => {
                setProfileImage("/man.png");
                console.error("Error uploading data:", error);
              });


          })
          .catch((error) => {
              setProfileImage("/man.png");
              console.error("Error uploading image:", error);
          });
    }
  };

 
  return (
    <div>
      <Stack direction='row' >
      <Hidden smDown>
        <div
          style={{
            background: "black",
            display: "flex",
            flexDirection: "column",
            width: "300px",
            color: "white",
            height: fullPageHeight ? fullPageHeight + 'px' : '100vh',
            position:"static"
          }}
        >
          <Stack spacing={2} style={{ padding: "20px" }}>





              <div
                style={{
                  position: "relative",
                  marginBottom: "10px",
                  borderRadius: "50px",
                  overflow: "hidden",
                  display:"flex",
                  justifyContent:"center"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >


                <Image
                  src={profileImage}
                  alt="editable studio background image"
                  style={{ margin: "0 auto", borderRadius: "50px" }}
                  width={100}
                  height={100}
                />
                {isHovered && (
                  
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    <button
                      style={{
                        color: "white",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={handleEditButtonClick}
                    >
                      Edit
                    </button>
                  </div>
                 
                )}
              </div>


              <FileUploader  
                  handleChange={handleChange}  
                  name="file" 
                  id="fileInput"
                  types={fileTypes}
                >
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </FileUploader>





            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => router.push("/step-one", { shallow: false })}
                >
                  <ListItemIcon>
                      <EditNoteIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary='New order' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setValue(1)}>
                  <ListItemIcon>
                    <AccountBoxIcon style={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary='My account' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setValue(2)}>
                  <ListItemIcon>
                  <Badge badgeContent={notificationNum} color="secondary">
                    <FormatListNumberedIcon style={{ color: 'white' }}/>
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary='All orders' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={logOut}>
                  <ListItemIcon>
                    <LogoutIcon style={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Stack>
        </div>
        </Hidden>


        <div style={{ padding: "30px", width: "100%" }}>
            {value === 1 && <MyAccount userData = {userData}/>}
            {value === 2 && <AllOrders setNotificationNum={setNotificationNum}/>}
        </div>


        <Hidden smUp>
          {/* Bottom Navigation (Hidden for screens below smUp) */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "#A9A9A9",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
           <Box sx={{ width: "100%" }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{ backgroundColor:"black"}}
              >
                <BottomNavigationAction style={{ color: 'white' }} label="New Order" icon={<EditNoteIcon />}  onClick={() => router.push("/step_one", { shallow: false })}/>
                <BottomNavigationAction style={{ color: 'white' }} label="Account" icon={<AccountBoxIcon />} />

                <BottomNavigationAction style={{ color: 'white' }} label="All Orders" icon={ 
                <Badge badgeContent={notificationNum} color="secondary">
                  <FormatListNumberedIcon />
                  </Badge>
                } />

                <BottomNavigationAction style={{ color: 'white' }} label="Log Out" icon={<LogoutIcon />} onClick={logOut}/>
              </BottomNavigation>
            </Box>
          </div>
        </Hidden>


       
      </Stack>
    </div>
  )
}

export default User
