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
  Box,
  Checkbox,
} from "@mui/material"

import CircularProgress from '@mui/material/CircularProgress';


import { useSearchParams } from "next/navigation"
import { checkout, getAddons } from "@/externalApi"
import { getDateDaysFromNow } from "@/utils"


import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StepTwo = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const category_id = searchParams.get("category_id")
  const style = searchParams.get("style")
  const style_id = searchParams.get("style_id")

  const [addons, setAddons] = useState()
  const [selectedAddons, setSelectedAddons] = useState([])

  const [imageCount, setImageCount] = useState(0)
  const [isCullingChecked, setCullingChecked] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState(10)
  const [culling_number, setCullingNumber] = useState(0)
  const [pricePerImage, setPricePerImage] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)


  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getAddons(category_id)
      .then((data) => {
        // console.log("Addons:", data)
        setAddons(data)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })

      if(category==null || category_id==null || style==null || style_id==null){
        window.location.href = '/step-one'
      }
   
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
      order_status:"Payment-due",
      // order_name: "Your Order Name",
      order_amount: totalPrice,
      // order_rating: 4.5,
      // culling_number: String(25),
      success_url: current_domain + "/step-final",
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

    {isLoaded ? (
      <>
          <Button onClick={() => window.location.href = 'step-one'} style={{ marginTop:"-10px",marginLeft: '10px' }}> 
            <ArrowBackIcon style={{ fontSize: 'small', marginRight: '8px' }} />
            Step One
          </Button>

      <SplitLayout form alignItems={"top"}>
        <div style={{ width:"90%" }}>
          <Typography variant='h5' marginTop={"20px"}>
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
                    <Stack key={addon.id} direction='row' alignItems={"top"} justifyContent={"space-between"}>
                      <div>
                        <FormControlLabel
                          sx={{ fontSize: "5em",marginTop:"20px" }}
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
                          <Typography variant='p'>
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
                      <Typography variant='p' gutterBottom sx={{ marginTop: "33px" ,paddingRight:"20px"}}>
                        ${addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack key={addon.id} direction='row' alignItems={"center"} justifyContent={"space-between"}>
                      <div>
                        <FormControlLabel
                          sx={{ fontSize: "5em",marginTop:"25px"}}
                          control={
                            <Checkbox
                              size='medium'
                              onChange={(e) => handleCheck(e.target.checked, addon)}
                            />
                          }
                          label={addon.addon_name}
                        />
                      </div>
                      <Typography variant='p' gutterBottom sx={{ marginTop: "24px" ,paddingRight:"20px"}}>
                        ${addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  )
                ))}





          <Stack direction={"row"} spacing={4} sx={{marginTop:"20px"}}>
            <Paper
              onClick={() => setDeliveryDate(10)}
              style={
                deliveryDate == 10
                  ? { background: "black", color: "white",  width: "50%" }
                  : { width: "50%" }   
              }
              sx={{ padding: "12px"}}
            >
              <Stack
                spacing={3}
                direction='row'
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant='h6' gutterBottom display={"block"} style={{ marginBottom:"7px" }}>
                  Standard
                </Typography>
                <Typography variant='p' gutterBottom>
                  $0.4/photo
                </Typography>
              </Stack>
              <Typography variant='p' gutterBottom>
                Standard pricing, delivery time: 10 days
              </Typography>
            </Paper>



            <Paper
              onClick={() => setDeliveryDate(4)}
              style={
                deliveryDate == 4 ? { background: "black", color: "white", width: "50%"} : {width: "50%"}
              }
              sx={{ padding: "12px" }}
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
                Premium pricing, delivery time: 4 days
              </Typography>
            </Paper>
          </Stack>
        </div>








          <Paper padding elevation={4} sx={{ background: "white", p:3, marginTop:"-55px"}}> {/* Add padding to the left */}
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
              sx={{ display: "block",width:"60%"}}
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
      </>
      ):(
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="70vh" // Adjust the height based on your design
        >
          <CircularProgress size={80} thickness={2}/>
        </Box>
      )}
    </ServiceLayout>
  )
}

export default StepTwo
