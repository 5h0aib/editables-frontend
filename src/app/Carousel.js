"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import Image from "next/image";

import { Autoplay, Navigation } from 'swiper/modules';

const images = ["/Portrait-1.jpg", "/Portrait-2.jpg", "/Portrait-3.jpg", "/Portrait-4.jpg", "/Portrait-5.jpg", "/Portrait-6.jpg"];

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
          <div style={{ borderRadius: '10px'}}>
            <Image src={image} width={400} height={400} layout={'responsive'}/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
