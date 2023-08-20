import Image from "next/image"
import Link from "next/link"

import styles from "./page.module.css"
import { Grid, Stack, Typography } from "@mui/material/"
import ServiceCard from "@/components/ServiceCard"
import Nav from "@/components/Nav"
import EmailToSignup from "@/components/EmailToSignup"
import MorphImage from "./MorphImage"
import StaggeredText from "./StaggeredText"
import Testimonials from "@/components/Testimonials"
import Faq from "@/components/Faq"
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBackground}
          src='/bg3.1.jpg'
          alt='editable studio background image'
          layout='fill'
          objectFit='cover'
          objectPosition='left top'
        />

        <div className={styles.heroContent}>
          <Nav />
          <Stack alignItems={"center"} justifyContent={"center"} spacing={4}>
            <Typography
              variant='h2'
              gutterBottom
              align='center'
              style={{ marginTop: "4hw" }}
            >
              Beautiful pictures, amazing outcomes
            </Typography>
            <Typography variant='subtitle1' gutterBottom align='center'>
              Get your images edited by professionals, anytime
            </Typography>
            <div style={{ width: "100%" }}>
              <EmailToSignup />
            </div>
          </Stack>
        </div>
      </section>

      <section>
        <Stack
          // style={{ minHeight: "100vh"}}
          spacing={4}
        >
          <Typography variant='h4' gutterBottom align='center'>
            Select the service you want for your picture
          </Typography>
          <Stack
            spacing={2}
            direction='row'
            alignItems='top'
            justifyContent='center'
            useFlexGap
            flexWrap='wrap'
          >
            <ServiceCard
              title='Basic'
              list={[
                "Lightroom Editing",
                "White balance, exposure & contrast correction",
                "Architectural line straightening",
                "Delivery in 10 days",
              ]}
            />
            <ServiceCard
              title='Express'
              list={[
                "Access to 4 Presets",
                "Service delivered within 7 days",
                "Multiple predefined styles to chose from",
                "Editing using inhouse guidelines",
              ]}
            />
            <ServiceCard
              title='Custom'
              list={[
                "Any preset of your liking",
                "Pre-defined & customizable styles",
                "Scheduled call with an inhouse editor",
                "sdf",
                "Service delivered within 4 days",
              ]}
            />
          </Stack>
        </Stack>
      </section>
      <section>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6}>
            <Typography variant='h4' gutterBottom>
              We don't just edit your pictures
            </Typography>
            <StaggeredText />
          </Grid>
          <Grid item xs={6}>
            <MorphImage />
          </Grid>
        </Grid>
      </section>
      <section>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6}>
            <Testimonials />
          </Grid>
          <Grid item xs={6}>
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
        <Stack
          spacing={4}
        >
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
