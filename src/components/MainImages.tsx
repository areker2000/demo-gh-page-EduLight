import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/mainImg-math.jpg';
import img2 from '../assets/mainImg-yoga.jpg';
import img3 from '../assets/mainImg-modeling.jpg';

const MainImages = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      className="rounded-2xl overflow-hidden shadow-lg"
    >
      <SwiperSlide>
        <img
          src={img1}
          className="w-full h-auto object-cover"
          alt="Online mathematics tutoring banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={img2}
          className="w-full h-auto object-cover"
          alt="Yoga and wellness classes banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={img3}
          className="w-full h-auto object-cover"
          alt="3D modeling and creative arts banner"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainImages;
