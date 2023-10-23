"use client"
import React, { useEffect, useState } from "react"
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
  Select,
  Typography,
} from "@mui/material"
import AdminLayout from "../AdminLayout"
import {
  changeOrderStatus,
  getBookings,
  getOrders,
  postOrders,
} from "@/externalApi"
import { formatDate, formatDateString } from "@/utils"
const AllOrders = () => {
  const [loading, setLoading] = useState(true)
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [type, setType] = useState("all")
  const [selectedStatus, setStatus] = useState("all")
  // async function loadOrders() {
  //   setLoading(true)
  //   const orders = await getOrders()
  //   setLoading(false)
  //   setData(orders?.data)
  //   console.log("orders: ", orders)
  // }
  useEffect(() => {
    getOrders()
      .then((orders) => {
        setAllOrders(orders)
        setFilteredOrders(orders)
        console.log("fectched Orders: ", orders)
      })
      .catch((err) => console.log(err))
    getBookings()
      .then((data) => {
        console.log("Bookings:", data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])

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
  function filteredRows() {
    if (type === "all") {
      return rows
    } else {
      return rows.filter((row) => row.type === type)
    }
  }
  async function triggerPostOrder() {
    const response = await postOrders({ title: "mast", body: "pasti" })
    console.log(response)
  }
  function handleStatusChange(e, id) {
    changeOrderStatus(e.target.value, id).then((res) =>
      console.log(res).catch((err) => console.log(err))
    )
  }
  // const distinctStatuses =  [...new Set(rows.map((row) => row.status))]
  // console.log(distinctStatuses)
  return (
    <AdminLayout>
      <div>
        <Typography variant='h5' gutterBottom display={"block"}>
          All orders
        </Typography>
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
        <TableContainer
          fullWidth
          component={Paper}
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
                  {/*  order, dateOfIssue, statuss, delivery, rating */}
                  <TableCell component='th' scope='row'>
                    {row.order_name}
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
                    >
                      <MenuItem value={"In-review"}>In review</MenuItem>
                      <MenuItem value={"Processing"}>processing</MenuItem>
                      <MenuItem value={"Culling"}>culling</MenuItem>
                      <MenuItem value={"Cropping"}>cropping</MenuItem>
                      <MenuItem value={"Completed"}>completed</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {formatDate(row.delivery_date)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Button>Download</Button>
                    <br />
                    <Button onClick={triggerPostOrder}>Upload</Button>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.style_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  )
}

export default AllOrders
