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

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

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
  const [categoryImage,setCategoryImage] = useState('/Wedding-1.jpg')
  const [StyleImage,setStyleImage] = useState('/Wedding-2.jpg')

  const [isLoaded, setIsLoaded] = useState(false)
  

  const[isDisabled, setIsDisabled] = useState(true)
  

  const buttonStyle = {
    backgroundColor: '#F1F1F1',
    color:'black',
    borderRadius: '15px'
  };

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


        if(selectedCategory){

          const category = data.find((category) => {
            return category.category_name.toLowerCase() === selectedCategory.toLowerCase();
          });
          setCategory(category.category_name)
          // setImage(category.category_image_url)
          setCategoryImage(`/${category.category_description}`)
          setStyleImage(`/${category.category_description}`)
          setOpen(true)
          setTimeout(() => {
            setOpen(false);
          }, 500);

        }
        else{
          setCategory(data[0].category_name)
          setImage(`/${data[0].category_description}`)

          setOpen(true)
            setTimeout(() => {
              setOpen(false);
            }, 500);
        }


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
      }
    }
  }

  const handleCategoryClick = (category_name) =>{
    setCategory(category_name)
    setStyle("custom")
    setIsDisabled(true)

    const category = allCatergories.find((category) => {
      return category.category_name === category_name 
    });

    const imageUrl = `/${category.category_description}` || '/Portrait-1.jpg';


    setCategoryImage(imageUrl)
    setStyleImage(imageUrl)

  }

  const handleStyleClick = (style_name) =>{
    setStyle(style_name)
    setIsDisabled(false)

    const category = allCatergories.find((category) => {
      return category.category_name === selectedCategory 
    });

    if(selectedCategory && style_name!="custom"){
      const style = allStyles.find((style) => {
        return style.category_id === category.id && style.style_name === style_name;
      });

      const imageUrl = `/${style.style_description}` || '/Portrait-2.jpg';


      setStyleImage(imageUrl)


      setOpen(true)
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
  }

 

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
        alignItems={"top"}
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
                    onClick={() => handleCategoryClick(category.category_name)}
                    style = {buttonStyle}
                  >
                    {category.category_name}
                  </Button>
                ))}
              </div>
            </div>
            <div style={{ marginTop:"50px" ,maxWidth:"600px"}}>
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
                    onClick={() => handleStyleClick(style.style_name)}
                    style = {buttonStyle}
                  >
                    {style.style_name}
                  </Button>
                ))}
                </div>
            </div>
          </div>




          
            {/* <Image src={imgageToShow} 
                  height={400}
                  width={400} 
                  alt="Style" 
                  layout={'responsive'} 
                  style={{ marginTop:"20px" , borderRadius: "20px"}} 
                  loading="eager"
                  /> */}
                  <ReactCompareSlider
                      itemOne={<ReactCompareSliderImage src={categoryImage}  srcSet={categoryImage} alt="Image one" />}
                      itemTwo={<ReactCompareSliderImage src={StyleImage}  srcSet={StyleImage} alt="Image two" />}
                      height={400}
                      width={400}
                      layout={'responsive'} 
                      style={{borderRadius: "20px"}} 
                      loading="eager"
                      disabled={isDisabled}
                      position={2}
                     />

   


   
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={24} sx={{ marginRight: 1 ,color:"white"}} />
                {/* {message} */}
            </div>
          </Alert>
        </Snackbar>

        </>
        ):(
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="60vh" 
        >
          <CircularProgress size={70} thickness={2}/>
        </Box>

        )}
      </ServiceLayout>


      </>
  )
}

export default StepOne
