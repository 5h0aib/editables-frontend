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
  Typography,
} from "@mui/material"
import AdminLayout from "../AdminLayout"
import { getTransactions,getInvoice } from "@/externalApi"

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';


const AllOrders = () => {
  const [type, setType] = useState("all")
  const [allTransactions, setAllTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])


  function filteredRows(name) {
    setType(name)
    if (name === "all") {
      setFilteredTransactions(allTransactions)
    } else {
      setFilteredTransactions(
        allTransactions.filter(
        (row) => row.order_type.toLowerCase() === name
      )
      )
    }
  }


  useEffect(() => {
    getTransactions()
      .then((data) => {
        setAllTransactions(data)
        setFilteredTransactions(data)
        // console.log("Transactions", data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  const handleIvoiceDownload = (inv_id) =>{
    getInvoice(inv_id)
  }

  return (
    <AdminLayout>
      <div>
        <Typography variant='h5' gutterBottom display={"block"}>
          All Orders
        </Typography>
        <Button
          variant={type == "all" ? "outlined" : "standard"}
          sx={{
            background: "white",
            marginRight: "20px",
            '@media (max-width: 600px)': {
              marginTop: '10px', 
            },
          }}
          onClick={() => filteredRows("all")}
        >
          All Orders
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
          onClick={() => filteredRows("standard")}
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
          onClick={() => filteredRows("express")}
        >
          Express
        </Button>
        <Button
          variant={type == "custom" ? "outlined" : "standard"}
          sx={{
            background: "white",

            '@media (max-width: 600px)': {
              marginTop: '10px', 
            },
          }}
          onClick={() => filteredRows("custom")}
        >
          Custom
        </Button>
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
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Total Bill</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.order_id}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.issue_date}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                  {row.order_status}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                  {row.order_type}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.delivery_date}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.gross_amount}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <IconButton onClick={() => handleIvoiceDownload(row.id)}>
                            <DownloadIcon />
                    </IconButton>
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
