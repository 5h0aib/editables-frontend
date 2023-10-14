"use client"
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import React, { useEffect, useState } from "react"
import { Button, Paper, Typography } from "@mui/material"
import { categories, styles } from "@/hardCode/all_style_catergories"
import Link from "next/link"
import Image from "next/image"
import { getCategories, getStyles } from "@/externalApi"

const StepOne = () => {
  const [selectedStyle, setStyle] = useState(styles[0])
  const [selectedCategory, setCategory] = useState(categories[0])
  const [allStyles, setStyles] = useState([])
  const [allCatergories, setCategories] = useState([])
  useEffect(() => {
    getStyles()
      .then((data) => {
        console.log("Fetched data:", data)
        setStyles(data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
      getCategories()
      .then((data) => {
        console.log("Fetched data:", data)
        setCategories(data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })

  }, [])
  return (
    <ServiceLayout
      formTitle='Choose the category & style that fits your images'
      subLines=''
      step=''
    >
      <SplitLayout form>
        <div>
          <br />
          <Typography variant='h5' gutterBottom>
            Choose a Category
          </Typography>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {/* {categories.map((category, i) => ( */}
            {allCatergories.map((category, i) => (
              <Button
                variant={category == category ? "outlined" : "standard"}
                onClick={() => setCategory(category)}
              >
                {category.category_name}
              </Button>
            ))}
          </div>
        </div>
        <Paper padding>
          <div>
            <Image
              src='/morphTo.jpg'
              // fill={true}
              height={300}
              width={400}
              style={{ objectFit: "cover", borderRadius: "20px" }}
            ></Image>
          </div>
        </Paper>
      </SplitLayout>
      <div>
        <br />
        <Typography variant='h5' gutterBottom>
          Choose a Style
        </Typography>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {/* {styles.map((style, i) => ( */}
          {allStyles.map((style, i) => (
            <Button
              large
              variant={style == selectedStyle ? "contained" : "outlined"}
              onClick={() => setStyle(style)}
            >
              {style.style_name}
            </Button>
          ))}
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href={`step_two?style=${selectedStyle.style_name}&style_id=${selectedStyle.iud}&category=${selectedCategory.category_name}&category_id=${selectedCategory.iud}`}
        >
          <Button variant='contained' size='large' style={{ minWidth: "33vw" }}>
            Next
          </Button>
        </Link>
      </div>
    </ServiceLayout>
  )
}

export default StepOne
