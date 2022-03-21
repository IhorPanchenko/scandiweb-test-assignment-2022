import React from "react";
import PropTypes from "prop-types";
import { ItemInCartLeft } from "./ItemInCartLeft/ItemInCartLeft";
import ItemInCartRight from "./ItemInCartRight/ItemInCartRight";
import s from "./ItemInCart.module.scss";

export class ItemInCart extends React.Component {
  render() {
    const { currencySymbol, item, index, isCartPage } = this.props;

    return (
      <div className={`${s.itemInCart} ${isCartPage ? s.cartPage : ""}`}>
        <ItemInCartLeft
          currencySymbol={currencySymbol}
          item={item}
          index={index}
          isCartPage={isCartPage}
        />

        <ItemInCartRight item={item} index={index} isCartPage={isCartPage} />
      </div>
    );
  }
}

ItemInCart.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  currencySymbol: PropTypes.string,
  isCartPage: PropTypes.bool,
};
