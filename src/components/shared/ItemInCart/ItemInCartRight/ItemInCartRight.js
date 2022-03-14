import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateItemCartQuantity,
  removeItemFromCart,
} from "../../../../redux/actions";
import { GlobalSvgSelector } from "../../../../assets/images/GlobalSvgSelector";
import CartSlider from "../../../shared/ImageSliders/CartSlider/CartSlider";
import s from "../ItemInCart.module.scss";

class ItemInCartRight extends React.Component {
  updateQuantity(isIncrement) {
    const { item, index, updateItemCartQuantity } = this.props;
    const newQuantity = isIncrement ? item.quantity + 1 : item.quantity - 1;
    if (!isIncrement && newQuantity < 0) return;
    updateItemCartQuantity(item.data.id, index, newQuantity);
  }

  render() {
    const { item, index, isCartPage, removeItemFromCart } = this.props;

    return (
      <div className={s.itemWrapperRight}>
        <div className={s.addRemoveBtnWrapper}>
          <button
            className={s.increaseBtn}
            type="button"
            onClick={() => this.updateQuantity(true)}
          >
            <GlobalSvgSelector id="increase-quantity" />
          </button>

          <div className={s.quantity}>{item.quantity}</div>
          <button
            className={s.decreaseBtn}
            type="button"
            onClick={() =>
              item.quantity <= 0
                ? removeItemFromCart(item.data.id, index)
                : this.updateQuantity(false)
            }
          >
            <GlobalSvgSelector id="decrease-quantity" />
          </button>
        </div>

        <div className={s.itemImgWrapper}>
          {isCartPage ? (
            <CartSlider gallery={item.data.gallery} />
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
