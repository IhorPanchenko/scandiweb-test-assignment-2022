import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateItemCartQuantity,
  removeItemFromCart,
} from "../../../../redux/actions";
import { GlobalSvgSelector } from "../../../../assets/images/GlobalSvgSelector";
import { CartSlider } from "../../Slider/CartSlider/CartSlider";
import s from "../ItemInCart.module.scss";

class ItemInCartRight extends React.Component {
  updateQuantity(e, isIncrement) {
    e.stopPropagation();
    const { item, index, updateItemCartQuantity, removeItemFromCart } =
      this.props;
    const newQuantity = isIncrement ? item.quantity + 1 : item.quantity - 1;
    updateItemCartQuantity(item.data.id, index, newQuantity);
    if (!isIncrement && newQuantity < 1) {
      removeItemFromCart(item.data.id, index);
    }
  }

  render() {
    const { item, isCartPage } = this.props;

    return (
      <div className={s.itemWrapperRight}>
        <div className={s.addRemoveBtnWrapper}>
          <button
            className={s.increaseBtn}
            type="button"
            onClick={(e) => this.updateQuantity(e, true)}
          >
            <GlobalSvgSelector id="increase-quantity" />
          </button>

          <div className={s.quantity}>{item.quantity}</div>
          <button
            className={s.decreaseBtn}
            type="button"
            onClick={(e) => this.updateQuantity(e, false)}
          >
            <GlobalSvgSelector id="decrease-quantity" />
          </button>
        </div>

        <div className={s.itemImgWrapper}>
          {isCartPage ? (
            <CartSlider imgs={item.data.gallery} />
          ) : (
            <img
              className={s.itemImg}
              src={item.data.gallery[0]}
              alt={item.data.name}
            ></img>
          )}
        </div>
      </div>
    );
  }
}

ItemInCartRight.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  updateItemCartQuantity: PropTypes.func,
  isCartPage: PropTypes.bool,
  removeItemFromCart: PropTypes.func,
};

const mapDispatchToProps = {
  updateItemCartQuantity,
  removeItemFromCart,
};

export default connect(null, mapDispatchToProps)(ItemInCartRight);
