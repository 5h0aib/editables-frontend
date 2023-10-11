"use client"
import ServiceLayout from "@/components/ServiceLayout"
import SplitLayout from "@/components/SplitLayout"
import React, { useState } from "react"
import { Button, Paper, Typography } from "@mui/material"
import { categories, styles } from "@/hardCode/all_style_catergories"
import Link from "next/link"
import Image from "next/image"

const StepOne = () => {
  const [selectedStyle, setStyle] = useState(styles[0])
  const [selectedCategory, setCategory] = useState(categories[0])
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
            {categories.map((category, i) => (
              <Button
                variant={
                  category == selectedCategory ? "contained" : "outlined"
                }
                onClick={() => setCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Image
            src='/morphTo.jpg'
            // fill={true}
            height={300}
            width={400}
            style={{ objectFit: "cover", float:"right", borderRadius:"20px" }}
          ></Image>
        </div>
      </SplitLayout>
      <div>
        <br />
        <Typography variant='h5' gutterBottom>
          Choose a Style
        </Typography>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {styles.map((style, i) => (
            <Button
              variant={style == selectedStyle ? "contained" : "outlined"}
              onClick={() => setStyle(style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href={`step_two?style=${selectedStyle}1&category=${selectedCategory}`}
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
