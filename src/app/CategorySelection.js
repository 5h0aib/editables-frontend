import SplitLayout from "@/components/SplitLayout"
import { Button, Paper, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"
import categoryImage from '../../public/category.png'
import Image from "next/image"

const CategorySelection = () => {
  return (
    <section>
      <Typography variant='h4' gutterBottom align='center'>
        Select the service you want for your picture
      </Typography>
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "20px",
        }}
      >
        <SplitLayout>
          <div>
            <Typography variant='h6' gutterBottom >
              Choose from 3 different image categories{" "}
            </Typography>
            <Typography variant='p' gutterBottom >
            Discover versatile image options for every project. From the beauty of nature to urban elegance and timeless vintage charm, our collection has something for everyone.
            </Typography><br/><br/>
            <Link href='step_one'>
              <Button variant='contained' size='large'>
                Get Started
              </Button>
            </Link>
          </div>
          <Paper color='gray' padding sx={{minHeight:"auto"}}>
          <Image src={categoryImage} alt="Category" layout={'responsive'} />
          </Paper>
        </SplitLayout>
      </div>
    </section>
  )
}

export default CategorySelection
