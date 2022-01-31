import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CartSlider.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

export default class CartSlider extends React.Component {
  render() {
    const { gallery } = this.props;

    return (
      <Swiper
        navigation={true}
        className="myCartSwiper"
        loop={true}
        navigation={{}}
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="itemImg" src={image}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
}
