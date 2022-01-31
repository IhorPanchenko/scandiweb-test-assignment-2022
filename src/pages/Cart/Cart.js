import React from "react";
import { connect } from "react-redux";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { getTotalPrice } from "../../helpers/prices";
import { ItemInCart } from "../../shared/ItemInCart/ItemInCart";
import CartSlider from "../../shared/ImageSliders/CartSlider/CartSlider";
import s from "./Cart.module.scss";

class Cart extends React.Component {
  render() {
    const { items, currencySymbol } = this.props;
    const total = getTotalPrice(items, currencySymbol);

    return (
      <div className={s.cart}>
        <h2>Cart</h2>

        {items.map((item) => (
          <ItemInCart
            item={item}
            currencySymbol={currencySymbol}
            isCartPage={true}
          />
        ))}

        <div className={s.cartTotalWrapper}>
          <div className={s.totalTitle}>Total:</div>
          <div>
            {currencySymbol}
            {total}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    currencySymbol: state.currencies.symbol,
  };
};

export default connect(mapStateToProps)(Cart);
