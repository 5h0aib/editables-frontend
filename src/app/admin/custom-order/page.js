"use client"
import SplitLayout from "@/components/SplitLayout"
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import React, { useEffect ,useState} from "react"
import AdminLayout from "../AdminLayout"
import { getAddons2,getCategories,getStyles,postOrders } from "@/externalApi"
import { useSearchParams } from "next/navigation"


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useRouter } from "next/navigation"


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomOrder = () => {

  const router = useRouter()

  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const uid = searchParams.get("uid")
  const booking_id = searchParams.get("booking_id")

  const [allCategories, setAllCategories] = useState([])
  const [selectedCategory , setSelectedCategory] = useState({id:"",name:""})

  const [allStyles, setAllStyles] = useState([])
  const [filteredStyles, setFilteredStyles] = useState([])
  const [selectedStyle , setSelectedStyle] = useState({id:"",name:""})

  const [allAddons, setAllAddons] = useState([])
  const [filteredAddons, setFilteredAddons] = useState([])
  const [selectedAddons, setSelectedAddons] = useState([])
  const [isCullingChecked, setCullingChecked] = useState(false)
  const [culling_number, setCullingNumber] = useState(0)


  const [dateValue, setDateValue] = useState(dayjs().add(4, 'day'));
  const [numImages, setNumImages] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("")

  const [orderButton, setOrderButton] = useState(false)


  const [toastMessage, setToastMessage] = useState("Order being Created, Please wait, You'll be redirected shortly.")
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("primary");


  const [loading, setLoading] = useState(false);



  useEffect(() => {
    let initialCategory = { id: "", name: "" };
    getCategories()
      .then((data) => {
        setAllCategories(data)
        initialCategory = { id: data[0].id, name: data[0].category_name };
        setSelectedCategory(initialCategory)
      })
      .catch((err) => console.log(err))


    getStyles()
      .then((data) => {
        setAllStyles(data)
        })
      .catch((error) => {
        console.log(error)
      })

    getAddons2()
    .then((data) => {
      setAllAddons(data)
      })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {


        const styles = allStyles.filter((style) => style.category_id === selectedCategory.id)
        if(styles.length>0){
        setFilteredStyles(styles)
        setSelectedStyle({id:styles[0].id,name:styles[0].style_name})
        }




        const addons = allAddons.filter((addon) => addon.category_id === selectedCategory.id)
        if(addons.length>0){
          setFilteredAddons(addons)
          }



  }, [selectedCategory,allStyles,allAddons])

const handleCategoryChange = (id,name)=>{

  setLoading(true);
  setSelectedAddons([])
  setSelectedCategory({id:id,name:name})

  // const filtered = allStyles.filter((style) => style.category_id === id);
  // setFilteredStyles(filtered)
  // setSelectedStyle({id:filtered[0].id,name:filtered[0].style_name})
  // const addons = allAddons.filter((addon) => addon.category_id === selectedCategory.id)
  // setFilteredAddons(addons)

  setTimeout(() => {
    setLoading(false);
  }, 2000);

}



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


const handleOrder = () =>{
  setOrderButton(true)
  

  if(!numImages || numImages==0){
    setOrderButton(false)
    setOpen(true)
    setToastMessage("Please input the number of images")
    setTimeout(() => {
      setOpen(false)
    }, 3000);

    return
  }
  if(!price || price==0){
    setOrderButton(false)
    setOpen(true)
    setToastMessage("Please input the price of this order")
    setTimeout(() => {
      setOpen(false)
    }, 3000);

    return
  }

  setOpen(true)

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

  const formattedDate = dateValue.format('YYYY-MM-DD');

  const orderDetails = {
    delivery_date: formattedDate,
    number_of_images: parseInt(numImages),
    user_id: uid,
    category_id: selectedCategory.id,
    style_id: selectedStyle.id,
    addon: transformedArray,
    delivery_method: 'Custom',
    order_amount: price,
    booking_id:booking_id,
    order_description:description,
    order_status:"Payment-due"
  }

  

  postOrders(orderDetails)
  .then((order) => {
    setOpen(true)
    setAlertSeverity("success")
    setToastMessage("Order Created Successfully")
    setTimeout(() => {
      setOpen(false)
      router.push(`/admin/all_order`, { shallow: true })
    }, 5000);

  })
  .catch((err) => console.log(err))

}

  return (
    <AdminLayout>
      <Typography variant='h5' gutterBottom display={"block"}>
        Custom Order
      </Typography>
      <SplitLayout alignItems='flex-start'>
        <div>
          <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                User email
              </Typography>
              <TextField size='small' value ={email} fullWidth  disabled/>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Number of Images
              </Typography>
              <TextField
              placeholder='Number of Images to upload'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              sx={{ display: "block" }}
              onChange={(e) => setNumImages(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Issuing date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}  style={{ width: '100%' }}>
                  <DatePicker
                    value={dayjs()}
                    disabled
                    style={{ width: '100%' }}
                    sx={{ width:"100%" }}
                  />
              </LocalizationProvider>

              {/* <TextField size='small' fullWidth /> */}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Delivery date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DatePicker
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    fullWidth
                    sx={{ width:"100%" }}
                  />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Category
              </Typography>
              <Select
                size='small'
                style={{ background: "white" }}
                fullWidth
                value={selectedCategory.name}
                // onChange={handleChange}
              >
                {allCategories?.map((category) => (
                  <MenuItem key={category.id} value = {category.category_name} onClick={()=>{handleCategoryChange(category.id,category.category_name)}}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Style
              </Typography>
              <Select
                size='small'
                style={{ background: "white" }}
                fullWidth
                value={selectedStyle.name}
                // onChange={handleChange}
              >
                {filteredStyles?.map((style) => (
                  <MenuItem value={style.style_name} key={style.id} onClick={()=>{setSelectedStyle({id:style.id,name:style.style_name})}}>
                    {style.style_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Price
              </Typography>
              <TextField
              placeholder='Order Price'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              sx={{ display: "block" }}
              onChange={(e) => setPrice(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='p' gutterBottom display={"block"}>
                Additional Instructions (if any)
              </Typography>
              <TextField
              placeholder='Order Description'
              variant='outlined'
              size='small'
              fullWidth
              multiline rows={4}
              sx={{ display: "block" }}
              onChange={(e) => setDescription(e.target.value)}
            />
         
            </Grid>
          </Grid>
        </div>
        <div>







          <Typography variant='h6' gutterBottom display={"block"}>
            Add-ons
          </Typography>

          {loading ? ( // Conditional rendering based on the loading state
            <div style={{ display: "flex", justifyContent: "center" ,marginTop:"30px"}}>
             <CircularProgress size={100} thickness={2}/>
            </div>
          ) : (
            <>
              {filteredAddons
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
                      <Typography variant='p' gutterBottom sx={{ marginTop: "28px" }}>
                        {addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack key={addon.id} direction='row' alignItems={"center"} justifyContent={"space-between"}>
                      <div>
                        <FormControlLabel
                          sx={{ fontSize: "5em",marginTop:"20px"}}
                          control={
                            <Checkbox
                              size='medium'
                              onChange={(e) => handleCheck(e.target.checked, addon)}
                            />
                          }
                          label={addon.addon_name}
                        />
                      </div>
                      <Typography variant='p' gutterBottom sx={{ marginTop: "26px" }}>
                        {addon.addon_starting_price}/photo
                      </Typography>
                    </Stack>
                  )
                ))}
            </>
          )}









        </div>
      </SplitLayout>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant='contained' size='large' style={{ minWidth: "33vw" }} onClick={()=>{handleOrder()}} disabled={orderButton}>
          issue custom order
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={alertSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </AdminLayout>
  )
}

export default CustomOrder
