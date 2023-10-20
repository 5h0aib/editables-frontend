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
  OutlinedInput,
  Rating,
  Select,
  Typography,
} from "@mui/material"
import { getOrdersofThisUser } from "@/externalApi"
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
  function filterOrders() {
    if (type === "all") {
      return allOrders
    } else {
      return allOrders.filter(
        (row) => row.order_status.toLowerCase() === selectedStatus
      )
    }
  }
  useEffect(() => {
    getOrdersofThisUser()
      .then((orders) => {
        setAllOrders(orders)
        setFilteredOrders(orders)
        console.log("fectched Orders: ", orders)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      
      <Typography variant='h5' gutterBottom display={"block"}>
        All orders
      </Typography>
      <p>not getting these info from get request</p>
      <Button
        variant={type == "all" ? "outlined" : "stantdard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => setType("all")}
      >
        All orders
      </Button>
      <Button
        variant={type == "basic" ? "outlined" : "stantdard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => setType("basic")}
      >
        Basic
      </Button>
      <Button
        variant={type == "express" ? "outlined" : "stantdard"}
        sx={{ background: "white", marginRight: "20px" }}
        onClick={() => setType("express")}
      >
        Express
      </Button>
      <Button
        variant={type == "custom" ? "outlined" : "stantdard"}
        sx={{ background: "white" }}
        onClick={() => setType("custom")}
      >
        Custom
      </Button>
      <br />
      <br />
      <TableContainer fullWidth component={Paper} style={{ minWidth: "100%" }}>
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
                    <MenuItem value={"in review"}>In review</MenuItem>
                    <MenuItem value={"processing"}>processing</MenuItem>
                    <MenuItem value={"payment due"}>payment due</MenuItem>
                    <MenuItem value={"completed"}>completed</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/*  order, dateOfIssue, statuss, delivery, rating */}
                <TableCell component='th' scope='row'>
                  {row.order_name}
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
