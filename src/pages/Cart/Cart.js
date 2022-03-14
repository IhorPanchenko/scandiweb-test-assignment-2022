import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTotalPrice } from "../../helpers/pricesAndQuantity";
import ItemInCart from "../../components/shared/ItemInCart/ItemInCart";
import s from "./Cart.module.scss";

class Cart extends React.Component {
  render() {
    const { items, currencySymbol } = this.props;
    const { totalPrice } = getTotalPrice(items, currencySymbol);

    return (
      <div className={s.cart}>
        <h2>Cart</h2>

        {Object.keys(items).map((key) =>
          items[key].map((item, index) => (
            <ItemInCart
              key={"cart" + item.data.id + index}
              item={item}
              currencySymbol={currencySymbol}
              isCartPage={true}
              index={index}
            />
          ))
        )}

        <div className={s.cartTotalWrapper}>
          <div className={s.totalTitle}>Total:</div>
          <div>
            {currencySymbol}
            {totalPrice}
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.object,
  currencySymbol: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    currencySymbol: state.currencies.symbol,
  };
};

export default connect(mapStateToProps)(Cart);
