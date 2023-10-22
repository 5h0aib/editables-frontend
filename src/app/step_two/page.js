"use client"
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import React, { useEffect, useState } from "react"
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
import { checkout, getAddons, getCookie } from "@/externalApi"

const StepTwo = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const style = searchParams.get("style")
  const [addons, setAddons] = useState()
  const [selectedAddons, setSelectedAddons] = useState([])
  const [imageCount, setImageCount] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState()

  useEffect(() => {
    getAddons()
      .then((data) => {
        console.log("Fetched data:", data)
        setAddons(data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])

  useEffect(() => {
    console.log("addons: ", selectedAddons)
    console.log("delivery: ", deliveryDate)
  }, [selectedAddons, deliveryDate])

  // const handleCheck = (isChecked, addon) => {
  //   if (isChecked) {
  //     if (!selectedAddons.includes(id)) {
  //       setSelectedAddons([...selectedAddons, id])
  //     }
  //   } else {
  //     if (selectedAddons.includes(id)) {
  //       setSelectedAddons(selectedAddons.filter((item) => item !== id))
  //     }
  //   }
  // }
  const handleCheck = (isChecked, addon) => {
    if (isChecked) {
      // Check if the addon with the given id exists in the selectedAddons array
      if (!selectedAddons.some((item) => item.uid === addon.id)) {
        setSelectedAddons([...selectedAddons, addon])
      }
    } else {
      // Filter out the addon with the given id from selectedAddons
      setSelectedAddons(selectedAddons.filter((item) => item.id !== addon.id))
    }
  }

  const handleCheckout = () => {
    const checkOutDetails = {
      delivery_date: getDeliveryDate(deliveryDate),
      number_of_images: parseInt(imageCount),
      user_id: getCookie("uid"),
      category_id: searchParams.get("category_id"),
      style_id: searchParams.get("style_id"),
      addon: selectedAddons,
      // order_name: "Your Order Name",
      order_amount: 100.0,
      // order_rating: 4.5,
      // culling_number: String(25),
      success_url: "https://www.facebook.com/",
      cancel_url: "https://www.google.com/",
    }
    console.log(checkOutDetails)
    checkout(checkOutDetails)
  }
  function getDeliveryDate(daysFromNow) {
    const currentDate = new Date()
    const targetDate = new Date(currentDate)
    targetDate.setDate(currentDate.getDate() + daysFromNow)
    const year = targetDate.getFullYear()
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0")
    const day = targetDate.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  return (
    <ServiceLayout
      formTitle='Select your add-ons, confirm payment & relax!'
      subLines=''
      step=''
    >
      <SplitLayout form>
        <div style={{ maxWidth: "700px" }}>
          {/* <Typography variant='h5' gutterBottom>
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
          </Typography> */}
          {addons?.map((addon) => (
            <Stack
              direction='row'
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <div>
                <FormControlLabel
                  sx={{ fontSize: "5em" }}
                  control={
                    <Checkbox
                      size='medium'
                      onChange={(e) =>
                        handleCheck(e.target.checked, {
                          uid: String(addon.id),
                          order_addon_description: "",
                        })
                      }
                    />
                  }
                  label={addon.addon_name}
                />
              </div>
              <Typography variant='p' gutterBottom sx={{ marginTop: "6px" }}>
                {addon.price}/photo
              </Typography>
            </Stack>
          ))}
          <Stack direction={"row"} spacing={2}>
            <Paper
              padding
              onClick={() => setDeliveryDate(10)}
              style={
                deliveryDate == 10
                  ? { background: "black", color: "white" }
                  : {}
              }
            >
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
            <Paper
              padding
              onClick={() => setDeliveryDate(4)}
              style={
                deliveryDate == 4 ? { background: "black", color: "white" } : {}
              }
            >
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

        <Paper padding elevation={4} sx={{ background: "white" }}>
          <Stack spacing={2}>
            <div>
              <Typography variant='h6' gutterBottom>
                Category
              </Typography>
              <Chip label={category} />
            </div>
            <div>
              <Typography variant='h6' gutterBottom>
                Style
              </Typography>
              <Chip label={style} />
            </div>
            <TextField
              placeholder='Number of Images to upload'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              sx={{ display: "block" }}
              onChange={(e) => setImageCount(e.target.value)}
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
            {/* <Link href={"step_final"}> */}
            <Button
              variant='contained'
              size='large'
              fullWidth
              onClick={handleCheckout}
            >
              Checkout
            </Button>
            {/* </Link> */}
            <Typography variant='caption' display='block' gutterBottom>
              This payment is secured by an SSL connection courtesy of Stripe
              Payments.
            </Typography>
          </Stack>
        </Paper>
      </SplitLayout>
    </ServiceLayout>
  )
}

export default StepTwo
