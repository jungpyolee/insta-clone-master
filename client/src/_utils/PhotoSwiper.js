import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
//import "styles.css";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

function PhotoSwiper(props) {
  return (
    <Swiper style={{}} navigation={true}>
      {props.post.images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:5000/${image}`}
            alt="상세사진"
            style={{ width: 600, maxHeight: "600px" }}
          ></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default PhotoSwiper;
