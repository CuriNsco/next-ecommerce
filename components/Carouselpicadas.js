import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Picada2, Picada4, Picada6 } from "../public/assets/index";

// Utiliza las imágenes en tu código


export default function Carouselpicadas() {

    const images = [
        { src: Picada2 },
        { src: Picada4 },
        { src: Picada6 },
      ];
    
      return (
        <>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            className="mySwiper w-[1200px] h-[300px] bg-red-200 mt-12 object-cover rounded-xl"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.src} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );
    }