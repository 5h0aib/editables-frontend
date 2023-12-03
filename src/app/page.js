import Image from "next/image"
import styles from "./page.module.css"
import { Paper, Stack, Typography } from "@mui/material/"
import Nav from "@/components/Nav"
import EmailToSignup from "@/app/EmailToSignup"
import MorphImage from "./MorphImage"
import StaggeredText from "./StaggeredText"
import Testimonials from "@/app/Testimonials"
import Faq from "@/app/Faq"
import SplitLayout from "@/components/SplitLayout"
import CategorySelection from "./CategorySelection"
import gif from "../../public/home.gif"
import Footer from "@/components/footer"

import { getCategories } from "@/externalApi"

import Carousel from "./carousel"




export default async function Home() {

  const data = await getCategories()
  

  return (
    <main className={styles.main}>
      <section className={""} style={{ padding: "2rem" }}>
        <div className={""}>
          <Nav />
          <div>
            <Typography
              variant='h4'
              gutterBottom
              align='center'
              style={{ marginTop: "1rem" }}
            >
              Beautiful pictures, amazing outcomes
            </Typography>
            <Typography variant='subtitle1' gutterBottom align='center'>
              Get your images edited by professionals, anytime
            </Typography>
          </div>
    
          <Image src={gif} 
           layout={'responsive'}
            alt="Home Gif" />

          <div style={{ width: "100%" }}>
            <EmailToSignup />
          </div>
        </div>
      </section>

      <CategorySelection categories = {data}/>

      <section>
        <SplitLayout>

          
          <Carousel />
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant='h4' gutterBottom paddingLeft={2}>
              We don&apos;t just edit your pictures
            </Typography>
            <StaggeredText />
          </div>
        </SplitLayout>
      </section>


      <section style={{ textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom>
          What people have to say about us
        </Typography>
        <Typography variant='h6' gutterBottom style={{ marginTop: '20px',marginBottom:'20px' }}>
          That too from around the world
        </Typography>
        <Testimonials />
      </section>



      <section>
        <Stack spacing={4} >
          <Typography variant='h4' gutterBottom align='center'>
            Frequently Asked Questions
          </Typography>
          <Faq />
          <EmailToSignup />
        </Stack>
      </section>
  
      <Footer />

    </main>
  )
}
