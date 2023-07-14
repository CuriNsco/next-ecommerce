import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Picada2, Picada4, Picada6 } from "../public/assets/index";
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import Image from 'next/image';



export default function Carouselpicadas() {

    const images = [
        { src: Picada2 },
        { src: Picada4 },
        { src: Picada6 },
      ];
    
      return (
        <div className='flex  items-start justify-center'>       
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
        w-[300px] h-[320px] 
        sm:w-[1000px] sm:h-[300px] sm:mt-4 sm:object-cover sm:rounded-xl"
      >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image src={image.src} width={1200} height={300} alt='picadas' className="
                w-auto h-auto object-fill
                sm:object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>

      );
    }