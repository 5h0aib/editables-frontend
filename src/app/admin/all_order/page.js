"use client"
import React, { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material"
import AdminLayout from "../AdminLayout"
import {
  changeOrderStatus,
  getBookings,
  getOrders,
  createUpload
} from "@/externalApi"
import { formatDate, formatDateString } from "@/utils"

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import { FileUploader } from "react-drag-drop-files"; 
import { initializeApp} from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


import Badge from '@mui/material/Badge';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


import { useRouter } from "next/navigation"

const fileTypes = ["ZIP"]; 

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

const AllOrders = () => {

  const router = useRouter()

  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [type, setType] = useState("all")
  const [selectedStatus, setStatus] = useState("all")

  const [isUploading, setIsUploading] = useState(false);

  const [numBookings, setNumBookings] = useState(0);


  useEffect(() => {

    getOrders()
      .then((orders) => {
        setAllOrders(orders.results)
        setFilteredOrders(orders.results)
        // console.log("fectched Orders: ", orders)
      })
      .catch((err) => console.log(err))

    getBookings()
      .then((data) => {

        setNumBookings(data.length)
        console.log(numBookings)
        // console.log("Bookings:", data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])


  function handleStatus(event) {
    setStatus(event.target.value)
    if (event.target.value === "all") {
      setFilteredOrders(allOrders)
    } else {
      setFilteredOrders(
        allOrders.filter(
          (row) => row.order_status === event.target.value && row.delivery_method.toLowerCase() === type
        )
      )
    }
  }

  function filterOrder(name) {
    setStatus("all")
    setType(name)
    if (name === "all") {
      setFilteredOrders(allOrders)
    } else {
      setFilteredOrders(
        allOrders.filter(
        (row) => row.delivery_method.toLowerCase() === name
      )
      )
      
    }
  }


  const handleChange = (uploadedFile, rowId) => {
    setIsUploading(true);

    if(uploadedFile){
      const storageRef = ref(storage, `admin/order_${rowId}/${uploadedFile.name}`);

      uploadBytes(storageRef, uploadedFile)
          .then((snapshot) => {
              console.log("Upload Successfull");
              return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
                const uploadDetails = {
                catalogue_url: downloadURL,
                upload_service:"firebase",
                order_id: rowId,
                catalogue_name: "Order",
                storage_path: `admin/order_${rowId}/${uploadedFile.name}`,
                file_type: "ZIP",
                zip_size: `${uploadedFile.size}`,
              }
              createUpload(uploadDetails)
              // console.log("Download URL:", downloadURL);
          })
          .then(() => {
            setIsUploading(false); // Upload finished, close the dialog
          })
          .catch((error) => {
              setIsUploading(false);
              console.error("Error uploading image:", error);
          });
    }


  }


  function handleStatusChange(e, id) {
      const newStatus = e.target.value;
      const updatedOrders = [...filteredOrders];
      const rowIndex = updatedOrders.findIndex((row) => row.id === id);

      changeOrderStatus(e.target.value, id)
      .then((res) =>{
        if (rowIndex !== -1) {
          
          updatedOrders[rowIndex].order_status = newStatus;
          setFilteredOrders(updatedOrders); 
        }
        console.log(res)
      }
      )
      .catch((err) => console.log(err))
  }


  return (
    <AdminLayout>
      <div>
        <Typography variant='h5' gutterBottom display={"block"}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Orders
        </Typography>




        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button
              variant={type == "all" ? "outlined" : "standard"}
              sx={{
                background: "white",
                marginRight: "20px",
                '@media (max-width: 600px)': {
                  marginTop: '10px', 
                },
              }}
              onClick={() => filterOrder("all")}
            >
              All orders
            </Button>
            <Button
              variant={type == "standard" ? "outlined" : "standard"}
              sx={{
                background: "white",
                marginRight: "20px",
                '@media (max-width: 600px)': {
                  marginTop: '10px', 
                },
              }}
              onClick={() => filterOrder("standard")}
            >
              Standard
            </Button>
            <Button
              variant={type == "express" ? "outlined" : "standard"}
              sx={{
                background: "white",
                marginRight: "20px",
               
                '@media (max-width: 600px)': {
                  marginTop: '10px',
                },
              }}
              onClick={() => filterOrder("express")}
            >
              Express
            </Button>

            <Button
              variant={type == "custom" ? "outlined" : "standard"}
              sx={{
                background: "white",
                marginRight: "20px",
                
                '@media (max-width: 600px)': {
                  marginTop: '10px', 
                },
              }}
              onClick={() => filterOrder("custom")}
            >
              Custom
            </Button>


      
            <Badge badgeContent={numBookings} color="warning" sx={{
                  display: 'none' ,
                  '@media (max-width: 750px)': {
                    marginTop: '10px', 
                    // display: "inline-block"
                    display: "grid"
                    },
                }}>
                  <Button
                  variant="contained"
                  sx={{
                    background: "black",
                    display: 'none' ,
                    '@media (max-width: 750px)': {
                      display: 'block',
                    },
                  }}
                  size = "small" 
                  onClick={() => router.push(`/admin/bookings`, { shallow: true })}
                >
                   Custom order requests
                </Button>
            </Badge>
     



    
          </div>
          <Badge badgeContent={numBookings} color="warning" 
                  sx={{
                  '@media (max-width: 750px)': {
                    display: 'none' 
                  },
                  
                }}>
              <Button
                variant="contained"
                sx={{
                  background: "black",
                  width:"300px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '@media (max-width: 750px)': {
                    display: 'none' 
                  },
                  
                }}
                size = "small" 
                onClick={() => router.push(`/admin/bookings`, { shallow: true })}
              >
               Custom order requests
               <AddCircleRoundedIcon  
               sx={{
                  marginLeft: '10px',
                }}
                />
              </Button>
          </Badge>
        </div>

        <br />
        <br />
        <TableContainer
          fullWidth
          // component={Paper}
          style={{ minWidth: "100%" }}
        >
          <Table aria-label='simple table' style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Status
                    </InputLabel>
                    <Select
                      labelId='demo-multiple-name-label'
                      id='demo-multiple-name'
                      value={selectedStatus}
                      label='Status'
                      onChange={handleStatus}
                      size='small'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"In-review"}>In review</MenuItem>
                      <MenuItem value={"Processing"}>Processing</MenuItem>
                      <MenuItem value={"Culling"}>Culling</MenuItem>
                      <MenuItem value={"Cropping"}>Cropping</MenuItem>
                      <MenuItem value={"Payment-due"}>Payment-due</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Style</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {formatDateString(row.created_at)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Select
                      labelId='demo-multiple-name-label'
                      id='demo-multiple-name'
                      value={row.order_status}
                      onChange={(e) => handleStatusChange(e, row.id)}
                      size='small'
                      style={{
                        backgroundColor: row.order_status === 'Completed' ? '#5eda9f' : 'inherit',
                      }}
                      fullWidth
                    >
                      <MenuItem value={"In-review"}>In review</MenuItem>
                      <MenuItem value={"Processing"}>Processing</MenuItem>
                      <MenuItem value={"Culling"}>Culling</MenuItem>
                      <MenuItem value={"Cropping"}>Cropping</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {formatDate(row.delivery_date)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                  {row.download_url_customer ? (
                        <IconButton onClick={() => window.open(row.download_url_customer, '_blank')}>
                          <DownloadIcon />
                        </IconButton>
                      ) : (
                        <IconButton disabled>
                          <DownloadIcon />
                        </IconButton>
                      )}
                      <FileUploader  
                          handleChange={(uploadedFile) => handleChange(uploadedFile, row.id)}
                          name="file" 
                          types={fileTypes}> 
                          <IconButton >
                                      <DriveFolderUploadIcon />
                                    </IconButton>
                          </FileUploader >
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.style_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={isUploading} maxWidth="xs" fullWidth>
            <Box p={2}>
              <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <DialogTitle>Your Upload is being processed</DialogTitle>
                  <CircularProgress size={80}/>
                  <DialogTitle>please wait</DialogTitle>
                </Box>
              </DialogContent>
            </Box>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

export default AllOrders
