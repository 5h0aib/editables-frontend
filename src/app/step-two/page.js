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
import { checkout, getAddons } from "@/externalApi"
import { getDateDaysFromNow } from "@/utils"

const StepTwo = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const category_id = searchParams.get("category_id")
  const style = searchParams.get("style")
  const [addons, setAddons] = useState()
  const [selectedAddons, setSelectedAddons] = useState([])
  const [imageCount, setImageCount] = useState(0)
  const [isCullingChecked, setCullingChecked] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState(10)
  const [culling_number, setCullingNumber] = useState(0)
  const [pricePerImage, setPricePerImage] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    getAddons(category_id)
      .then((data) => {
        // console.log("Addons:", data)
        setAddons(data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])

  useEffect(() => {

    const baseDeliveryPrice = 0.4
    const deliveryVariable = deliveryDate == 10 ? 1 : 1.25
    const styleVariable = style == "Basic color correction" ? 0.5 : 1

    let addOnPrice = 0

    selectedAddons.forEach(
      ({
        addon_starting_price
      }) => {
        addOnPrice += parseFloat(addon_starting_price) * deliveryVariable *styleVariable
      }
    )
    setPricePerImage(((addOnPrice + (baseDeliveryPrice * deliveryVariable * styleVariable))).toFixed(2))

    const finalAddonPrice = parseInt(addOnPrice * imageCount)
    const finalDeliverPrice = parseInt((baseDeliveryPrice * deliveryVariable * styleVariable) * imageCount)

    const finalPrice = finalAddonPrice + finalDeliverPrice


    if (imageCount === 0 || !imageCount) {
      setTotalPrice(0);
    } else {
      setTotalPrice(finalPrice);
    }
  }, [
    selectedAddons,
    deliveryDate,
    imageCount,
    culling_number,
    isCullingChecked,
  ])

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

      const transformedArray = selectedAddons.map(item => {
        if(item.addon_name == "Culling")
            return {
                uid: item.id,
                order_addon_description:culling_number
            };
        else{
          return {
            uid: item.id,
            order_addon_description:""
        };
        }

    });

    const current_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

    const checkOutDetails = {
      delivery_date: getDateDaysFromNow(deliveryDate),
      number_of_images: parseInt(imageCount),
      user_id: localStorage.getItem('uid'),
      category_id: searchParams.get("category_id"),
      style_id: searchParams.get("style_id"),
      addon: transformedArray,
      delivery_method: deliveryDate == 10 ? 'Standard' : 'Express',
      // order_name: "Your Order Name",
      order_amount: totalPrice,
      // order_rating: 4.5,
      // culling_number: String(25),
      success_url: current_domain + "/payment-success",
      cancel_url: current_domain + "/payment-failed"
    }

    checkout(checkOutDetails)
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
          {addons
                ?.sort((a, b) => {
                  if (a.addon_name === "Culling") return -1;
                  if (b.addon_name === "Culling") return 1;
                  return 0;
                })
                .map((addon) => (
                  addon.addon_name === "Culling" ? (
                    <Stack direction='row' alignItems={"top"} justifyContent={"space-between"}>
                      <div>
                        <FormControlLabel
                          sx={{ fontSize: "5em" }}
                          control={
                            <Checkbox
                              size='medium'
                              // disabled
                              // checked={culling_number > 0}
                              onChange={(e) => {
                                handleCheck(e.target.checked, addon);
                                setCullingChecked(e.target.checked);
                              }}
                            />
                          }
                          label={addon.addon_name}
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
                            disabled={!isCullingChecked}
                          />
                        </div>
                      </div>
                      <Typography variant='p' gutterBottom sx={{ marginTop: "8px" }}>
                        {addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction='row' alignItems={"center"} justifyContent={"space-between"}>
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
                      <Typography variant='p' gutterBottom sx={{ marginTop: "6px" }}>
                        {addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  )
                ))}





          <Stack direction={"row"} spacing={2}>
            <Paper
              padding
              onClick={() => setDeliveryDate(10)}
              style={
                deliveryDate == 10
                  ? { background: "black", color: "white"}
                  : { }   
              }
              sx={{ padding: "10px" }}
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
                  $0.4/photo
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
                deliveryDate == 4 ? { background: "black", color: "white", p: 2 } : { p: 2}
              }
              sx={{ padding: "10px" }}
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
                  $0.5/photo
                </Typography>
              </Stack>
              <Typography variant='p' gutterBottom>
                premium pricing, delivery time: 4 days
              </Typography>
            </Paper>
          </Stack>
        </div>








  <Paper padding elevation={4} sx={{ background: "white", p: 2, }}> {/* Add padding to the left */}
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
        Price per image : ${pricePerImage}
      </Typography>
      {/* <Typography variant='h6' gutterBottom>
        VAT $7.5
      </Typography> */}
    </Stack>
    <Divider />
    <Typography variant='h4' gutterBottom>
      Total Payment
    </Typography>
    <Typography variant='h3' gutterBottom>
      ${totalPrice}
    </Typography>
    {/* <Link href={"step_final"}> */}
    <Button
      variant='contained'
      size='large'
      fullWidth
      onClick={handleCheckout}
      disabled={imageCount == 0 || !imageCount}
    >
      Checkout
    </Button>
    {/* </Link> */}
    <Typography variant='caption' display='block' gutterBottom>
      Please note that the total amount is rounded up.
    </Typography>
    <Typography variant='caption' display='block' gutterBottom>
      This payment is secured by an SSL connection courtesy of Stripe.
      Payments.
    </Typography>
  </Stack>
</Paper>

      </SplitLayout>
    </ServiceLayout>
  )
}

export default StepTwo