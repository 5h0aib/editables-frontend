import React, { useState } from "react"
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
  Select,
  Typography,
} from "@mui/material"
const AllOrders = () => {
  const [type, setType] = useState("all")
  const [selectedStatus, setStatus] = useState("all")
  function createData(order, dateOfIssue, statuss, delivery, rating, type) {
    return { order, dateOfIssue, statuss, delivery, rating, type }
  }
  const rows = [
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "Processing",
      "3rd September 2023",
      5,
      "basic"
    ),
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "In review",
      "3rd September 2023",
      0,
      "express"
    ),
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "Completed",
      "3rd September 2023",
      0,
      "basic"
    ),
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "In review",
      "3rd September 2023",
      4,
      "basic"
    ),
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "Culling",
      "3rd September 2023",
      0,
      "custom"
    ),
    createData(
      `Helix’s wedding Order No. 9965`,
      "3rd September 2023",
      "Payment due",
      "3rd September 2023",
      3,
      "custom"
    ),
  ]

  function handleChange(event) {
    console.log("status changed")
    setStatus(event.target.value)
  }
  function filteredRows() {
    if (type === "all") {
      return rows
    } else {
      return rows.filter((row) => row.type === type)
    }
  }
  // const distinctStatuses =  [...new Set(rows.map((row) => row.status))]
  // console.log(distinctStatuses)
  return (
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
                    size="small"
                  >
                    <MenuItem value={"In review"}>In review</MenuItem>
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
            {filteredRows().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/*  order, dateOfIssue, statuss, delivery, rating */}
                <TableCell component='th' scope='row'>
                  {row.order}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.dateOfIssue}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.statuss}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.delivery}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.rating}
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
