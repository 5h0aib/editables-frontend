"use client"
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import 'swiper/swiper-bundle.css';

import { Paper, Typography } from "@mui/material";
import Image from "next/image";

import image1 from "../../public/bg1.webp";
import image2 from "../../public/bg3.jpg";

const testimonials = [
  {
    name: "Tahzeeb",
    profession: "UI/UX Designer, Creative Co.",
    testimonial:
      "This app is amazing! It made my photo editing tasks much easier.",
    imageSrc: "/bg1.webp",
  },
  {
    name: "Akib",
    profession: "Lead Product Designer, Wise",
    testimonial:
      "Excellent tool for editing pictures on the go. Helped me edit a bunch of pictures like I want",
    imageSrc: "/testimonials/woman.png",
  },
  {
    name: "Sadee",
    profession: "UI/UX Designer, Creative Co.",
    testimonial:
      "This app is amazing! It made my photo editing tasks much easier.",
    imageSrc: "/testimonials/man.png",
  },
  {
    name: "Tahzeeb",
    profession: "UI/UX Designer, Creative Co.",
    testimonial:
      "This app is amazing! It made my photo editing tasks much easier.",
    imageSrc: "/bg1.webp",
  },
  {
    name: "Akib",
    profession: "Lead Product Designer, Wise",
    testimonial:
      "Excellent tool for editing pictures on the go. Helped me edit a bunch of pictures like I want",
    imageSrc: "/testimonials/woman.png",
  },
  {
    name: "Sadee",
    profession: "UI/UX Designer, Creative Co.",
    testimonial:
    "Excellent tool for editing pictures on the go. Helped me edit a bunch of pictures like I want",
    imageSrc: "/testimonials/man.png",
  },
];



const Testimonials = () => {
  
  return (
    <Swiper
      spaceBetween={40}
      slidesPerView={2}
      centeredSlides={true}
      loop={true} 
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
        <Paper elevation={3} style={{ padding: "10px 20px", minHeight: "305px", display: "flex", alignItems: "center", minWidth: "200px" }}>
          <div className="testimonial-image" style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <Image src={testimonial.imageSrc} alt="Testimonial Image" width={100} height={100} style={{ borderRadius: '50%' }} />
          </div>
          <div style={{ flex: 3, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", paddingLeft: "10px" }}>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              {testimonial.testimonial}
            </Typography>
            <Typography variant="h5" style={{ fontSize: "16px", fontWeight: "bold", textAlign: "left", marginTop: "10px" }}>
              {testimonial.name}
            </Typography>
            <Typography variant="h6" style={{ fontSize: "12px", fontWeight: "bold", textAlign: "left" }}>
              {testimonial.profession}
            </Typography>
          </div>
        </Paper>
      </SwiperSlide>
      
      ))}
    </Swiper>
  );
};

export default Testimonials;

