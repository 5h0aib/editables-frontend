import { Typography } from "@mui/material"
import Image from "next/image"
import React from "react"

const Testimonials = () => {
  //create nested array for carousel
  const testimonials = [
    {
      name: "Juliana Lara",
      profession: "Lead Product Designer, Wise",
      testimonial:
        "Excellent tool for editing pictures on the go.  Helped me edit bunch of pictures like I want",
      imageSrc: "/testimonials/woman.png",
    },
    {
      name: "Juliana Lara",
      profession: "Lead Product Designer, Wise",
      testimonial:
        "Excellent tool for editing pictures on the go.  Helped me edit bunch of pictures like I want",
      imageSrc: "/testimonials/man.png",
    },
  ]

  const style1 = {
    marginLeft: "80px",
    borderRadius: "30px 30px 30px 0",
    padding: "30px",
    background: "#D9D9D9",
    position: "relative",
    svg:{
      position: "absolute", bottom: -28, left: "0"
    }
  }
  const style2 = {
    marginRight: "80px",
    borderRadius: "30px 30px 0px 30px",
    padding: "30px",
    background: "#D9D9D9",
    marginTop: "120px",
    position: "relative",
    svg:{
      position: "absolute", bottom: -28, right: "0", transform:"rotateY(180deg)"
    }
  }
  return (
    <div>
      {testimonials.map((testimonial, i) => (
        <>
          <div style={i % 2 == 0 ? style1 : style2}>
            <Typography variant='body1'>{testimonial.testimonial}</Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: "bolder" }}>
              {testimonial.name}
            </Typography>
            <Typography variant='subtitle2'>
              {testimonial.profession}
            </Typography>
            <div style={i % 2 == 0 ? style1.svg : style2.svg}>
              <svg
                width='42'
                height='23'
                viewBox='0 0 42 23'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.00634766 22.9819V0.640137H40.8681L0.00634766 22.9819Z'
                  fill='#D9D9D9'
                />
              </svg>
            </div>
          </div>
          <div>
            <Image
              width={100}
              height={100}
              src={testimonial.imageSrc}
              style={{ float: i % 2 == 0 ? "left" : "right" }}
            />
          </div>
          {/* <Image
            width={100}
            height={100}
            src={
              i % 2 ? "/tesmonials/corner.svg" : "/tesmonials/flippedCorner.svg"
            }
            style={{ float: i % 2 == 0 ? "left" : "right" }}
          /> */}
        </>
      ))}
    </div>
  )
}

export default Testimonials
