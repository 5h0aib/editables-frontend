"use client"
import SplitLayout from "@/components/SplitLayout"
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"

import React, { useEffect ,useState} from "react"
import AdminLayout from "../AdminLayout"
import { styles } from "@/hardCode/all_style_catergories"
import { getAddons,getCategories,getStyles } from "@/externalApi"
import { useSearchParams } from "next/navigation"


import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const CustomOrder = () => {

  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategory , setSelectedCategory] = useState({id:"",name:""})
  const [allStyles, setAllStyles] = useState([])
  const [filteredStyles, setFilteredStyles] = useState([])
  const [selectedStyle , setSelectedStyle] = useState({id:"",name:""})
  const [dateValue, setDateValue] = useState(dayjs().add(4, 'day')  );



  useEffect(() => {
    let initialCategory = { id: "", name: "" };
    let filtered = []
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
        filtered = data.filter((style) => style.category_id === initialCategory.id)
        setFilteredStyles(filtered)
        setSelectedStyle({id:filtered[0].id,name:filtered[0].style_name})
        })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  const demoData = {
    addon: [
      { uid: "1", order_addon_description: "" },
      { uid: "2", order_addon_description: "" },
    ],
    category_id: "1",
    delivery_method:"Custom",
    delivery_date: "2023-11-01",
    number_of_images: 234,
    order_amount: 100,
    order_status: 'Payment-due',
    order_name: "Your Order Name",
    order_rating: 4.5,
    style_id: "1",
    user_id: "7",
  }

const handleCategoryChange = (id,name)=>{

  setSelectedCategory({id:id,name:name})

  const filtered = allStyles.filter((style) => style.category_id === id);
  setFilteredStyles(filtered)
  setSelectedStyle({id:filtered[0].id,name:filtered[0].style_name})

}
const handleOrder = () =>{
  console.log(selectedCategory)
  console.log(selectedStyle)
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
              <TextField size='small' fullWidth />
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
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='p' gutterBottom display={"block"}>
                Additional Instructions (if any)
              </Typography>
              <TextField size='small' fullWidth multiline rows={4} />
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography variant='h6' gutterBottom display={"block"}>
            Add-ons
          </Typography>
          <FormControlLabel
            sx={{ fontSize: "5em" }}
            control={<Checkbox size='medium' />}
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
            <TextField size='small' variant='outlined' fullWidth />
          </div>

          <div>
            <FormControlLabel
              sx={{ fontSize: "5em" }}
              control={<Checkbox size='medium' />}
              label='Quick look'
            />
          </div>
          <div style={{ marginLeft: "32px" }}>
            <Typography variant='p' gutterBottom display={"block"}>
              Get a preview of the 10% of your total edited pictures in 36-48
              hours
            </Typography>
          </div>

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
          <FormControlLabel
            sx={{ fontSize: "5em" }}
            control={<Checkbox size='medium' />}
            label='Creative cropping'
          />
        </div>
      </SplitLayout>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant='contained' size='large' style={{ minWidth: "33vw" }} onClick={()=>{handleOrder()}} >
          issue custom order
        </Button>
      </div>
    </AdminLayout>
  )
}

export default CustomOrder
