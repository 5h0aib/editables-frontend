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
import Demo from "./Demo"
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={""}>
        {/* <Image
          className={styles.heroBackground}
          src='/editable-header.svg'
          alt='editable studio background image'
          layout='fill'
          objectFit='cover'
          objectPosition='left top'
        /> */}

        <div className={""}>
          <Nav />
            <div>
              <Typography
                variant='h4'
                gutterBottom
                align='center'
                style={{ marginTop: "4hw" }}
              >
                Beautiful pictures, amazing outcomes
              </Typography>
              <Typography variant='subtitle1' gutterBottom align='center'>
                Get your images edited by professionals, anytime
              </Typography>
            </div>
            <Demo />
            <div style={{ width: "100%" }}>
              <EmailToSignup />
            </div>
        </div>
      </section>

      <CategorySelection />

      <section>
        <SplitLayout>
          <Paper>
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
      <section>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Testimonials />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' gutterBottom>
              What people have to say about us
            </Typography>
            <Typography variant='h5' gutterBottom>
              That too from around the world
            </Typography>
          </Grid>
        </Grid>
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
        <h2>Footer</h2>
      </footer>
    </main>
  )
}
