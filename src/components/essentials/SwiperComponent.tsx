import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export const SwiperComponent: React.FC<{ slides: React.ReactNode[] }> = ({ slides }) => {
  return (
    <div className='slider'>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        modules={[Pagination]}
        className='swiper-container'>
        {slides.map((slide: React.ReactNode, index: number) => {
          return <SwiperSlide key={index}>{slide}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
};
