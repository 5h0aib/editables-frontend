import Image from "next/image"
import Link from "next/link"

import styles from "./page.module.css"
import { Grid, Paper, Stack, Typography } from "@mui/material/"
// import FullServiceCard from "./FullServiceCard"
import Nav from "@/components/Nav"
import EmailToSignup from "@/app/EmailToSignup"
import MorphImage from "./MorphImage"
import StaggeredText from "./StaggeredText"
import Testimonials from "@/app/Testimonials"
import Faq from "@/app/Faq"
import SplitLayout from "@/components/SplitLayout"
import CategorySelection from "./CategorySelection"

import gif from "../../public/home.gif"

export default function Home() {
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
          {/* <Demo /> */}
          <Image src={gif} 
           layout={'responsive'}
            alt="Home Gif" />

          <div style={{ width: "100%" }}>
            <EmailToSignup />
          </div>
        </div>
      </section>

      <CategorySelection />

      <section>
        <SplitLayout>
          <Paper padding>
            <MorphImage />
          </Paper>
          <>
            <Typography variant='h4' gutterBottom>
              We don&apos;t just edit your pictures
            </Typography>
            <StaggeredText />
          </>
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
        <Stack spacing={4}>
          <Typography variant='h4' gutterBottom align='center'>
            Frequently Asked Questions
          </Typography>
          <Faq />
          <EmailToSignup />
        </Stack>
      </section>
      <footer>
        {/* <div style={{ display: "flex", justifyContent: "right" }}>
          <Grid container spacing={3} sx={{width:"min(100%,600px)"}}>
            <Grid item xs={12} sm={6} >
              <FacebookIcon/>
              <Typography variant='body1' gutterBottom sx={{display:"inline"}}>
                Frequently Asked Questions
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
        </div> */}
      </footer>
    </main>
  )
}
