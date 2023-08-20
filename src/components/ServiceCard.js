import React from "react"
import {Card, CardActions, CardContent,Typography, Button} from "@mui/material"
import Link from "next/link"

const ServiceCard = ({ title, list }) => {
  return (
    <Card variant='outlined'>
        <CardContent>
        <Typography variant='h5' gutterBottom>
                 {title}
             </Typography>
             <ul>
                 {list?.map((item,i) => (
                 <li key={i}>{item}</li>
                 ))}
             </ul>
        </CardContent>
        <CardActions>
          <Link href={"/"+title.toLowerCase()}>
          <Button variant="contained" >Get Service</Button>
          </Link>
        </CardActions>
    </Card>
  )
}

export default ServiceCard