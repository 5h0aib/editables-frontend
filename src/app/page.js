import Image from "next/image"
import Link from "next/link"

import styles from "./page.module.css"
import { Grid, Stack, Typography } from "@mui/material/"
import ServiceCard from "@/components/ServiceCard"
import Nav from "@/components/Nav"
import EmailToSignup from "@/components/EmailToSignup"
import MorphImage from "./MorphImage"
import StaggeredText from "./StaggeredText"
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBackground}
          src='/heroBackground.png'
          alt='editable studio background image'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />

        <div className={styles.heroContent}>
          <Nav />
          <Typography variant='h2' gutterBottom align='center'>
            Beautiful pictures, amazing outcomes
          </Typography>
          <Typography variant='subtitle1' gutterBottom align='center'>
            Get your images edited by professionals, anytime
          </Typography>
          <Typography variant='subtitle1' gutterBottom align='center'>
            Ready to start editing? Sign up with your email address
          </Typography>
          <EmailToSignup />
        </div>
      </section>

      <section>
        <Typography variant='h4' gutterBottom align='center'>
          Choose the plan you want for your images
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
      </section>
      <section>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h4' gutterBottom align='center'>
              What people have to say about us
            </Typography>
            <StaggeredText/>
          </Grid>
          <Grid item xs={6}>
            <MorphImage/>
          </Grid>
        </Grid>

        <Typography variant='h4' gutterBottom align='center'>
          that too from all over the world
        </Typography>
      </section>
      <section>
        <Typography variant='h4' gutterBottom align='center'>
          What people have to say about us
        </Typography>
        <Typography variant='h4' gutterBottom align='center'>
          that too from all over the world
        </Typography>
      </section>
      <section>
        <Typography variant='h4' gutterBottom align='center'>
          Frequently Asked Questions
        </Typography>
        <EmailToSignup />
      </section>
      <footer>
        <h2>Footer</h2>
      </footer>
    </main>
  )
}
