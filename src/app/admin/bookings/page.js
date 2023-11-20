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
  Typography,
} from "@mui/material"
import {formatDateString } from "@/utils"
import AdminLayout from "../AdminLayout"
import {
  getBookings,
} from "@/externalApi"

import { useRouter } from "next/navigation"

const AllBookings = () => {

  const router = useRouter()

  const [allBookings, setallBookings] = useState([])

  useEffect(() => {
    getBookings()
      .then((data) => {
        const filteredBookings = data.filter((booking) => booking.booking_status === "Scheduled");
        setallBookings(
          filteredBookings
        )
        // console.log("Bookings:", data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      });
  }, []);



  return (
    <AdminLayout>
      <div>
        <Typography variant='h5' gutterBottom display={"block"}>
        All Bookings
        </Typography>
        <TableContainer
          fullWidth
          // component={Paper}
          style={{ minWidth: "100%" }}
        >
          <Table aria-label='simple table' style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>User Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Book</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBookings?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.email}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.contact_number}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {formatDateString(row.created_at)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                   -
                  </TableCell>
                  <TableCell component='th' scope='row'>
                  <Button 
                  variant="contained" 
                  size="small" 
                  onClick={()=>router.push(`/admin/custom-order?uid=${row.user_id}&email=${row.email}&booking_id=${row.id}`, { shallow: true })}
                  style={{ backgroundColor: "#F4F4F8",color :"black" ,textTransform: "none"}}>
                    Issue
                  </Button>
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

export default AllBookings
