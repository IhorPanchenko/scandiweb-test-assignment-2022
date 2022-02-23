import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "./CartSlider.scss";
import "swiper/scss";
import "swiper/scss/navigation";

SwiperCore.use([Navigation]);

export default class CartSlider extends React.Component {
  render() {
    const { gallery } = this.props;
    
    return (
      <Swiper
        navigation={gallery.length > 1}
        className="myCartSwiper"
        loop={gallery.length > 1}
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="itemImg" src={image} alt={"product_image"}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
}
