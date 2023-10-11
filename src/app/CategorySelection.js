import SplitLayout from "@/components/SplitLayout"
import { Button, Paper, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

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
          <Link href='step_one'>
            <Button variant='contained' size='large'>
              Get Started
            </Button>
          </Link>
          <Paper color='gray' padding>hello world</Paper>
        </SplitLayout>
      </div>
    </section>
  )
}

export default CategorySelection
