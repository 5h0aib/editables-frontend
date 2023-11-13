import React, { useEffect, useState } from "react"
// import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material"
import { getOrders} from "@/externalApi"
import { formatDate, formatDateString } from "@/utils"

const AllOrders = () => {
  const [type, setType] = useState("all")
  const [selectedStatus, setStatus] = useState("all")
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  function handleChange(event) {
    setStatus(event.target.value)
    if (event.target.value === "all") {
      setFilteredOrders(allOrders)
    } else {
      setFilteredOrders(
        allOrders.filter(
          (row) => row.order_status.toLowerCase() === event.target.value
        )
      )
    }
  }

  function filterOrder(name) {
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
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      
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
        variant={type == "custom" ? "outlined" : "stantdard"}
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
                  {row.order_status}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {formatDate(row.delivery_date)}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <Rating
                    name='read-only'
                    value={row.order_rating}
                    precision={0.5}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AllOrders
