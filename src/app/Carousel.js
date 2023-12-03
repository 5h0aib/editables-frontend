"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import Image from "next/image";

import { Autoplay, Navigation } from 'swiper/modules';

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg"];

const Carousel = () => {
  return (
    <Swiper spaceBetween={20} 
    loop={true} 
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    //  navigation={true}
    modules={[Autoplay, Navigation]}
    
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div style={{ overflow:"hidden"}}>
            <Image src={image} width={400} height={400} layout={'responsive'} style={{ borderRadius: '10px',overflow:"hidden"}}/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
