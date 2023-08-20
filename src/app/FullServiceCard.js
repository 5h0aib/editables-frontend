import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
} from "@mui/material"
import Link from "next/link"
import Image from "next/image"

const ServiceCard = ({ title, list, icon }) => {
  return (
    <Grid item xs={12} md={4}>
      <div
        style={{
          borderRadius: " 40px 2px 40px 2px",
          border: "1px solid black",
          padding: "40px",
          height:"100%"
        }}
      >
        <Stack alignItems="center" justifyContent="space-between" style={{height:"100%"}} spacing={2}>
          <Image src={icon} alt='editable studio' width={100} height={100} />
          <Typography variant='h5' gutterBottom align='center'>
            {title}
          </Typography>
          <ul style={{ transform: 'translateX("20px")' }}>
            {list?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <Link href={"/" + title.toLowerCase()}>
            <Button variant='contained' size="large" >Get Service</Button>
          </Link>
        </Stack>
      </div>
    </Grid>
  )
}

export default ServiceCard
