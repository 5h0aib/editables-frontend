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
import React, { useEffect } from "react"
import AdminLayout from "../AdminLayout"
import { categories, styles } from "@/hardCode/all_style_catergories"
import { getAddons,getCategories,getStyles } from "@/externalApi"

const CustomOrder = () => {

  useEffect(() => {

    getCategories()
      .then((data) => {
        console.log("categories: ", data)
      })
      .catch((err) => console.log(err))

    getStyles()
      .then((data) => {
        console.log("styles:", data)
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
    cancel_url: "https://www.facebook.com/",
    category_id: "1",
    delivery_date: "2023-11-01",
    number_of_images: 234,
    order_amount: 100,
    order_name: "Your Order Name",
    order_rating: 4.5,
    style_id: "1",
    success_url: "https://www.facebook.com/",
    user_id: "7",
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
                Number of Images
              </Typography>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                User email
              </Typography>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Issuing date
              </Typography>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Delivery date
              </Typography>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='p' gutterBottom display={"block"}>
                Category
              </Typography>
              <Select
                size='small'
                style={{ background: "white" }}
                fullWidth
                // onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                // onChange={handleChange}
              >
                {styles.map((style) => (
                  <MenuItem value={style} key={style}>
                    {style}
                  </MenuItem>
                ))}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
        <Button variant='contained' size='large' style={{ minWidth: "33vw" }}>
          issue custom order
        </Button>
      </div>
    </AdminLayout>
  )
}

export default CustomOrder
