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
          <div>
            <Typography variant='h6' gutterBottom >
              Choose from more than 7 different image categories{" "}
            </Typography>
            <Typography variant='p' gutterBottom >
            Category description loren ipsum loren ipsum category description loren ipsum loren ipsum category description loren ipsum loren ipsum category description loren ipsum loren
            </Typography><br/><br/>
            <Link href='step_one'>
              <Button variant='contained' size='large'>
                Get Started
              </Button>
            </Link>
          </div>
          <Paper color='gray' padding sx={{minHeight:"60vh"}}>
            
          </Paper>
        </SplitLayout>
      </div>
    </section>
  )
}

export default CategorySelection
