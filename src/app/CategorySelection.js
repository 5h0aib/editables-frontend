import SplitLayout from "@/components/SplitLayout"
import { Button, Paper, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

const CategorySelection = () => {
  return (
    <section>
      {/* <Stack
          // style={{ minHeight: "100vh"}}
          spacing={4}
        > */}
      <Typography variant='h4' gutterBottom align='center'>
        Select the service you want for your picture
      </Typography>
      <SplitLayout>
        <Link href='step_one'>
          <Button variant='contained' size='large'>
            Get Started
          </Button>
        </Link>
        <Paper>hello world</Paper>
      </SplitLayout>
      {/* <Grid container spacing={2}>
            <FullServiceCard
              icon='/basic.png'
              title='Basic'
              list={[
                "Lightroom Editing",
                "White balance, exposure & contrast correction",
                "Architectural line straightening",
                "Delivery in 10 days",
              ]}
            />
            <FullServiceCard
              icon='/express.png'
              title='Express'
              list={[
                "Access to 4 Presets",
                "Service delivered within 7 days",
                "Multiple predefined styles to chose from",
                "Editing using inhouse guidelines",
              ]}
            />
            <FullServiceCard
              icon='/custom.png'
              title='Custom'
              list={[
                "Any preset of your liking",
                "Pre-defined & customizable styles",
                "Scheduled call with an inhouse editor",
                "sdf",
                "Service delivered within 4 days",
              ]}
            />
          </Grid> */}
      {/* </Stack> */}
    </section>
  )
}

export default CategorySelection
