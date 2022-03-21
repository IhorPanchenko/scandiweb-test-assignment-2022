import React from "react";
import PropTypes from "prop-types";
import { getCurrentPrice } from "../../../../helpers/pricesAndQuantity";
import ItemInCartAttributes from "../ItemInCartAttributes/ItemInCartAttributes";
import s from "../ItemInCart.module.scss";

export class ItemInCartLeft extends React.Component {
  render() {
    const { currencySymbol, item, index, isCartPage } = this.props;
    const price = getCurrentPrice(currencySymbol, item.data.prices);

    return (
      <div className={s.itemWrapperLeft}>
        <div className={s.itemInfo}>
          <div className={s.itemName}>{item.data.name}</div>
          <div className={s.itemBrand}>{item.data.brand}</div>
        </div>

        <div className={s.itemPrice}>
          {price.currency.symbol}
          {price.amount}
        </div>

        <ItemInCartAttributes
          item={item}
          index={index}
          isCartPage={isCartPage}
        />
      </div>
    );
  }
}

ItemInCartLeft.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isCartPage: PropTypes.bool,
  currencySymbol: PropTypes.string,
};
