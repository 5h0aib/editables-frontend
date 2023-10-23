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
import { getDateDaysFromNow } from "@/utils"

const StepTwo = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const style = searchParams.get("style")
  const [addons, setAddons] = useState()
  const [selectedAddons, setSelectedAddons] = useState([])
  const [imageCount, setImageCount] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState()
  const [culling_number, setCullingNumber] = useState(0)
  const [pricePerImage, setPricePerImage] = useState(0)

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
    console.log("number of images: ", imageCount)
    const cullingUnitPrice = 0.02
    const cullingPrice = cullingUnitPrice * imageCount
    let addOnPrice = 0
    const addOnQuantity = culling_number || imageCount
    selectedAddons.forEach(
      ({
        addon_starting_price,
        threshold_percentage,
        min_threshold_quantity,
      }) => {
        console.log(
          parseFloat(addon_starting_price),
          parseFloat(threshold_percentage),
          parseFloat(min_threshold_quantity),
          addOnQuantity
        )
        const thisAddonPrice = getDynamicPrice(
          parseFloat(addon_starting_price),
          parseFloat(threshold_percentage),
          parseFloat(min_threshold_quantity),
          addOnQuantity
        )
        addOnPrice += thisAddonPrice
      }
    )
    // addOnPrice= addOnPrice * quantity
    const deliveryCharge= deliveryDate == 4 ? 1 : 3
    console.log("culling: ", culling_number)
    console.log("addons: ", selectedAddons)
    console.log(
      "--------------------------------------------------------------"
    )
    console.log("culling Price: ", cullingUnitPrice)
    console.log("Other Addon price per culled image: ", addOnPrice)
    console.log("delivery Charge per culled image", deliveryCharge)
    console.log(
      "--------------------------------------------------------------"
    )
    setPricePerImage(cullingUnitPrice+addOnPrice+deliveryCharge)
    // setFinalPrice()
  }, [selectedAddons, deliveryDate, imageCount])

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

  function getDynamicPrice(maxPrice, minPriceThresh, quantityThresh, quantity) {
    const minPrice = (maxPrice * minPriceThresh) / 100
    console.log(maxPrice, minPriceThresh, quantityThresh, quantity)
    console.log(minPrice)
    if (quantity > quantityThresh) {
      return minPrice
    }
    const m = (minPrice - maxPrice) / quantityThresh
    // y=mx+c
    const priceY = m * quantity + maxPrice
    return priceY
  }
  const handleCheckout = () => {
    // const checkOutDetails = {
    //   delivery_date: getDateDaysFromNow(deliveryDate),
    //   number_of_images: parseFloat(imageCount),
    //   user_id: getCookie("uid"),
    //   category_id: searchParams.get("category_id"),
    //   style_id: searchParams.get("style_id"),
    //   addon: selectedAddons,
    //   // order_name: "Your Order Name",
    //   order_amount: 100.0,
    //   // order_rating: 4.5,
    //   // culling_number: String(25),
    //   success_url: "https://www.facebook.com/",
    //   cancel_url: "https://www.google.com/",
    // }
    // console.log(checkOutDetails)
    // checkout(checkOutDetails)
  }

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
            alignItems={"top"}
            justifyContent={"space-between"}
          >
            <div>
              <FormControlLabel
                sx={{ fontSize: "5em" }}
                control={
                  <Checkbox
                    size='medium'
                    // disabled
                    // checked={culling_number > 0}
                  />
                }
                label='Culling'
              />
              <div style={{ marginLeft: "32px" }}>
                <Typography variant='p' gutterBottom display={"block"}>
                  Narrow down the number of images you want
                </Typography>
                <Typography variant='caption' gutterBottom>
                  Narrow down the number of images you want
                </Typography>
                <br />
                <TextField
                  variant='outlined'
                  size='small'
                  fullWidth
                  type='number'
                  onChange={(e) => setCullingNumber(e.target.value)}
                />
              </div>
            </div>
            <Typography variant='p' gutterBottom sx={{ marginTop: "8px" }}>
              $0.02/photo
            </Typography>
          </Stack>

          {addons?.map(
            (addon) =>
              addon.addon_name !== "Culling" && (
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
                          onChange={(e) => handleCheck(e.target.checked, addon)}
                        />
                      }
                      label={addon.addon_name}
                    />
                  </div>
                  <Typography
                    variant='p'
                    gutterBottom
                    sx={{ marginTop: "6px" }}
                  >
                    {addon.addon_starting_price}/photo
                  </Typography>
                </Stack>
              )
          )}
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
                Price/image ${pricePerImage}
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
              ${pricePerImage * imageCount}
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
