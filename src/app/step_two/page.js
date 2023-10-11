"use client"
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import React from "react"
import {
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const StepTwo = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const style = searchParams.get("style")
  console.log(category, style)
  return (
    <ServiceLayout
      formTitle='Select your add-ons, confirm payment & relax!'
      subLines=''
      step=''
    >
      <SplitLayout form>
        <div style={{ maxWidth: "700px" }}>
          <Typography variant='h5' gutterBottom>
            Add-ons
          </Typography>
          <Stack
            direction='row'
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <div>
              <FormControlLabel
                sx={{ fontSize: "5em" }}
                control={<Checkbox size='medium' />}
                label='Culling'
              />
            </div>
            <Typography variant='p' gutterBottom sx={{ marginTop: "6px" }}>
              $0.02/photo
            </Typography>
          </Stack>
          <div style={{ marginLeft: "32px" }}>
            <Typography variant='p' gutterBottom display={"block"}>
              Narrow down the number of images you want
            </Typography>
            <Typography variant='caption' gutterBottom>
              Narrow down the number of images you want
            </Typography>
            <TextField
              variant='outlined'
              size='small'
              sx={{ display: "block" }}
            />
          </div>
          <Stack
            direction='row'
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <div>
              <FormControlLabel
                sx={{ fontSize: "5em" }}
                control={<Checkbox size='medium' />}
                label='Quick look'
              />
            </div>
            <Typography variant='p' gutterBottom sx={{ marginTop: "6px" }}>
              $0.02/photo
            </Typography>
          </Stack>
          <div style={{ marginLeft: "32px" }}>
            <Typography variant='p' gutterBottom display={"block"}>
              Get a preview of the 10% of your total edited pictures in 36-48
              hours
            </Typography>
          </div>
          <FormControlLabel
            sx={{ fontSize: "5em" }}
            control={<Checkbox size='medium' />}
            label='Creative cropping'
          />
          <div>
            <FormControlLabel
              sx={{ fontSize: "5em" }}
              control={<Checkbox size='medium' />}
              label='Monochrome Melodies'
            />
          </div>
          <div style={{ marginLeft: "32px" }}>
            <Typography variant='p' gutterBottom display={"block"}>
              Beautiful images in B&W, edited to highlight the best ambience.
              We’ll keep 10% of them
            </Typography>
          </div>
          <Typography variant='h5' gutterBottom display={"block"}>
            Select delivery turnover
          </Typography>
          <Stack direction={"row"}>
            <Paper>
              <Stack
                spacing={3}
                direction='row'
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant='h6' gutterBottom display={"block"}>
                  Standard
                </Typography>
                <Typography variant='p' gutterBottom>
                  $1/photo
                </Typography>
              </Stack>
              <Typography variant='p' gutterBottom>
                standard pricing, delivery time: 10 days
              </Typography>
            </Paper>
            <Paper>
              <Stack
                direction='row'
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant='h6' gutterBottom display={"block"}>
                  Express
                </Typography>
                <Typography variant='p' gutterBottom>
                  $3/photo
                </Typography>
              </Stack>
              <Typography variant='p' gutterBottom>
                premium pricing, delivery time: 4 days
              </Typography>
            </Paper>
          </Stack>
        </div>

        <div>
          <Paper elevation={4} sx={{ background: "white" }}>
            <Typography variant='h6' gutterBottom>
              Category
            </Typography>
            <Chip label={category} />
            <Typography variant='h6' gutterBottom>
              Style
            </Typography>
            <Chip label={style} />
            <TextField
              label='Images to upload'
              variant='outlined'
              size='small'
              sx={{ display: "block" }}
            />
            <Stack>
              <Typography variant='h6' gutterBottom>
                Price/image $3.0
              </Typography>
              <Typography variant='h6' gutterBottom>
                VAT $7.5
              </Typography>
            </Stack>
            <Divider />
            <Typography variant='h4' gutterBottom>
              Total Payment
            </Typography>
            <Typography variant='h3' gutterBottom>
              $46.5
            </Typography>
            <Link href={"step_final"}>
              <Button variant='contained' size='large' fullWidth>
                Checkout
              </Button>
            </Link>
            <Typography variant='caption' display='block' gutterBottom>
              This payment is secured by an SSL connection courtesy of Stripe
              Payments.
            </Typography>
          </Paper>
        </div>
      </SplitLayout>
    </ServiceLayout>
  )
}

export default StepTwo
