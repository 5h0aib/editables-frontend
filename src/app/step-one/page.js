"use client"
import ServiceLayout from "@/components/ServiceLayout"
import { useRouter } from "next/navigation"
import SplitLayout from "@/components/SplitLayout"
import React, { useEffect, useState } from "react"
import { Button,Box,Typography } from "@mui/material"
import Image from "next/image"
import { getCategories, getStyles } from "@/externalApi"
import AuthorizationOverlay from "@/components/AuthorizationOverlay"
import ContactOverlay from "@/components/ContactOverlay"
import { useSearchParams } from "next/navigation"
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StepOne = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const [selectedStyle, setStyle] = useState("custom");
  const [selectedCategory, setCategory] = useState(category)
  const [allStyles, setStyles] = useState([])
  const [uniqueStyles, setUniqueStyles] = useState([])
  const [allCatergories, setCategories] = useState([])
  const [openLogin, setOpenLogin] = useState(false)
  const [openCustom, setOpenCustom] = useState(false)
  const [nextUrl, setNextURL] = useState('step-two')
  const [open, setOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {

    getStyles()
      .then((data) => {
        setStyles(data)
        const uniqueStyleNames = new Set()

        // Filter out unique styles
        const uniqueStylesData = data.filter((style) => {
          if (!uniqueStyleNames.has(style.style_name)) {
            uniqueStyleNames.add(style.style_name)
            return true
          }
          return false
        })
        setUniqueStyles(uniqueStylesData)

      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })

    getCategories()
      .then((data) => {
        // console.log("Categories:", data)
        setCategories(data)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])

  const handleClick = () => {
    if (localStorage.getItem("isLoggedIn") != "true") {
      setOpenLogin(true)//open login overlay when not logged in
    } else {
      if (selectedStyle == "custom") {
        setOpenCustom(true)
      } else {

        const category = allCatergories.find((category) => {
          return category.category_name === selectedCategory 
        });

        if(category){
          const style = allStyles.find((style) => {
            return style.category_id === category.id && style.style_name === selectedStyle;
          });
        const url = `step-two?style=${style.style_name}&style_id=${style.id}&category=${category.category_name}&category_id=${category.id}`
        setNextURL(url)
        router.push(url, { shallow: false })
        }
        else{
          setOpen(true)
          setTimeout(() => {
            setOpen(false);
          }, 3000);
          // alert("Please make sure to select a category.");
        }
      }
    }
  }
  const buttonStyle = {
    backgroundColor: '#F1F1F1',
    color:'black',
    borderRadius: '15px'
  };

  return (
      <>
      <ServiceLayout
        formTitle='Choose the category & style that fits your images'
        subLines=''
        step=''
      > 
      {isLoaded ? (
        <>
        <SplitLayout form 
        // alignItems={"top"}
        >
          <div>
            <div>
              <Typography variant='h5' gutterBottom>
                Choose a Category
              </Typography>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                {allCatergories?.map((category, i) => (
                  <Button
                    key={category.id}
                    variant={
                      category.category_name == selectedCategory ? "outlined" : "contained"
                    }
                    onClick={() => setCategory(category.category_name)}
                    style = {buttonStyle}
                  >
                    {category.category_name}
                  </Button>
                ))}
              </div>
            </div>
            <div style={{ marginTop:"50px"}}>
                <Typography variant='h5' gutterBottom>
                  Choose a Style
                </Typography>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                <Button
                  medium
                  variant={selectedStyle === "custom" ? "outlined" : "contained"}
                  onClick={() => setStyle("custom")}
                  style = {buttonStyle}
                >
                  Custom
                </Button>
                {uniqueStyles?.map((style, i) => (
                  <Button
                    medium
                    key={style.id}
                    variant={style.style_name === selectedStyle ? "outlined" : "contained"}
                    onClick={() => setStyle(style.style_name)}
                    style = {buttonStyle}
                  >
                    {style.style_name}
                  </Button>
                ))}
                </div>
            </div>
          </div>
          {/* <Paper color='gray' padding sx={{minHeight:"auto"}}> */}
            <Image src='/morphTo.jpg' height={400}
                  width={400} alt="Style" layout={'responsive'} style={{ marginTop:"20px" , borderRadius: "20px"}}/>
          {/* </Paper> */}
        </SplitLayout>
       
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant='contained'
            onClick={handleClick}
            size='large'
            style={{ minWidth: "33vw" }}
          >
            Next
          </Button>
        </div>

        <AuthorizationOverlay
          open={openLogin}
          setOpen={setOpenLogin}
          isCustom={selectedStyle == "custom"}
          hRef={nextUrl}
          setOpenCustom={setOpenCustom}
        />
        <ContactOverlay open={openCustom} setOpen={setOpenCustom} />


        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity={"primary"} sx={{ width: '100%' }}>
            Please make sure to select a category.
          </Alert>
        </Snackbar>

        </>
        ):(
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="60vh" // Adjust the height based on your design
        >
          <CircularProgress size={70} thickness={2}/>
        </Box>

        )}
      </ServiceLayout>


      </>
  )
}

export default StepOne
