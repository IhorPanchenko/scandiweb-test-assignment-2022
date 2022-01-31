import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore, { FreeMode, Thumbs } from "swiper";
import "./ProductDetailsSlider.scss";

SwiperCore.use([FreeMode, Thumbs]);

export default class ProductDetailsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.swiperRef = React.createRef();
    this.state = {
      thumbsSwiper: null,
    };
  }

  onShowSlider(swiper) {
    this.setState({ thumbsSwiper: swiper });
  }

  render() {
    const { gallery } = this.props;

    return (
      <>
        <Swiper
          onSwiper={this.onShowSlider.bind(this)}
          direction="vertical"
          spaceBetween={28}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          className="myProductSwiper"
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="itemImg" src={image}></img>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          thumbs={{ swiper: this.state.thumbsSwiper }}
          className="myProductSwiper2"
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="itemImg" src={image}></img>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  }
}
