import React, { useEffect, useState } from "react"
// import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
// import Paper from "@mui/material/Paper"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Box,
  Select,
  Typography,
} from "@mui/material"
import { getOrders ,checkoutCustom} from "@/externalApi"
import { formatDate, formatDateString } from "@/utils"

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import CircularProgress from '@mui/material/CircularProgress';






const AllOrders = ({setNotificationNum}) => {
  const [type, setType] = useState("all")
  const [selectedStatus, setStatus] = useState("all")
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)


  function handleChange(event) {
    setStatus(event.target.value)
    if (event.target.value === "all") {
      setFilteredOrders(allOrders)
    } else {
        if(type === "all"){
          setFilteredOrders(
            allOrders.filter(
              (row) => row.order_status === event.target.value
            )
          )
        }
        else{
          setFilteredOrders(
            allOrders.filter(
              (row) => row.order_status === event.target.value && row.delivery_method.toLowerCase() === type
            )
          )
        }
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

  useEffect(() => {
    getOrders()
      .then((orders) => {
        setAllOrders(orders.results)
        setFilteredOrders(orders.results)

        const paymentOrders = orders.results.filter(
          (row) => row.order_status === "Payment-due"
        )
        
        setNotificationNum(paymentOrders.length)

        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      })
      .catch((err) => console.log(err))
  }, [])


  // const handleRatingChange = (id,value) =>{
  //   console.log(value)
  // }



  const handlePayNow = (id) =>{
    const current_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

    const checkOutDetails = {
      order_id:id,
      success_url: current_domain + "/step-final",
      cancel_url: current_domain + "/payment-failed"
    }
    // console.log(checkOutDetails)
    checkoutCustom(checkOutDetails)
  }
  
  return (
    
    <div>

      {isLoaded ? (
      <>
      <Typography variant='h5' gutterBottom display={"block"}>
        {type.charAt(0).toUpperCase() + type.slice(1)} orders
      </Typography>
      <Button
        variant={type == "all" ? "outlined" : "standard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => filterOrder("all")}
      >
        All orders
      </Button>
      <Button
        variant={type == "standard" ? "outlined" : "standard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => filterOrder("standard")}
      >
        Standard
      </Button>
      <Button
        variant={type == "express" ? "outlined" : "standard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => filterOrder("express")}
      >
        Express
      </Button>
      <Button
        variant={type == "custom" ? "outlined" : "standard"}
        sx={{ background: "white" }}
        onClick={() => filterOrder("custom")}
      >
        Custom
      </Button>
      <br />
      <br />
      <TableContainer fullWidth 
      // component={Paper} 
      style={{ minWidth: "100%" }}>
        <Table aria-label='simple table' style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Date of issue</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                  <Select
                    labelId='demo-multiple-name-label'
                    id='demo-multiple-name'
                    value={selectedStatus}
                    label='Status'
                    onChange={handleChange}
                    size='small'
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"In-review"}>In review</MenuItem>
                    <MenuItem value={"Processing"}>Processing</MenuItem>
                    <MenuItem value={"Culling"}>Culling</MenuItem>
                    <MenuItem value={"Cropping"}>Cropping</MenuItem>
                    <MenuItem value={"Payment-due"}>Payment due</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders?.map((row) => (
      
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/*  order, dateOfIssue, statuss, delivery, rating */}
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {formatDateString(row.created_at)}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.order_status === "Completed" && (
                      <>
                      {row.download_url_customer ? (
                        <IconButton onClick={() => window.open(row.download_url_customer, '_blank')}>
                          <DownloadIcon />
                        </IconButton>
                      ) : (
                        <IconButton disabled>
                          <DownloadIcon />
                        </IconButton>
                      )}
                      </>
                    )}
                    {row.order_status === "Payment-due" && (
                      <Button variant="contained" color="primary" size="small" onClick={() => handlePayNow(row.id)}>
                        Pay Now
                      </Button>
                    )}
                    {row.order_status !== "Completed" && row.order_status !== "Payment-due" && (
                     row.order_status
                    )}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                  ${row.order_amount}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {formatDate(row.delivery_date)}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <Rating
                    name='read-only'
                    value={row.order_rating}
                    precision={1}
                    readOnly
                    // onChange={(event, newValue) => handleRatingChange(row.id, newValue)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
      ):(

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh" // Adjust the height based on your design
        >
          <CircularProgress size={70} thickness={2}/>
        </Box>

      )
}
      </div>
  )
}

export default AllOrders
