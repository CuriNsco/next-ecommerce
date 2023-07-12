import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Picada2, Picada4, Picada6 } from "../public/assets/index";
import {Autoplay, Pagination, Navigation} from 'swiper/modules'



export default function Carouselpicadas() {

    const images = [
        { src: Picada2 },
        { src: Picada4 },
        { src: Picada6 },
      ];
    
      return (
        <>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper 
        rounded-xl
        sm:w-[1200px] sm:h-[300px] sm:mt-12 sm:object-cover sm:rounded-xl"
      >
          {/* <Swiper
            pagination={{
              dynamicBullets: true,    
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper 
            rounded-xl
            sm:w-[1200px] sm:h-[300px] sm:mt-12 sm:object-cover sm:rounded-xl"
          > */}
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.src} className="
                w-full h-full object-fill
                sm:w-full sm:h-full sm:object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );
    }