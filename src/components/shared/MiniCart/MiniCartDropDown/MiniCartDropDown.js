import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GlobalSvgSelector } from "../../../../assets/images/GlobalSvgSelector";
import { getTotalPrice } from "../../../../helpers/pricesAndQuantity";
import { ItemInCart } from "../../ItemInCart/ItemInCart";
import s from "../MiniCart.module.scss";

export class MiniCartDropDown extends React.Component {
  render() {
    const { items, currencySymbol, onCartClicked } = this.props;
    const { totalPrice, totalQuantity } = getTotalPrice(items, currencySymbol);

    return (
      <div className={`drop-down-cart ${s.dropdownCart}`}>
        {/* if cart is empty */}
        {!totalQuantity ? (
          <div className={s.emptyCart}>
            <GlobalSvgSelector id="header-cart" />
            <span>Your cart is empty</span>
          </div>
        ) : (
          <div>
            <div className={s.cartTitle}>
              <span>
                My cart,{" "}
                <span>
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>
              </span>
            </div>

            <div className={s.itemInCartWrapper}>
              {Object.keys(items).map((key) =>
                items[key].map((item, index) => (
                  <ItemInCart
                    key={"mini-cart" + item.data.id + index}
                    item={item}
                    currencySymbol={currencySymbol}
                    index={index}
                  />
                ))
              )}
            </div>
            {/* Cart Total Amount */}
            <div className={s.cartTotalWrapper}>
              <div className={s.totalTitle}>Total</div>
              <div className={s.totalValue}>
                {currencySymbol}
                {totalPrice}
              </div>
            </div>
            {/* Cart Buttons */}
            <div className={s.cartBtnWrapper}>
              <Link to="/cart">
                <button
                  className={s.viewBag}
                  type="button"
                  onClick={() => {
                    onCartClicked();
                  }}
                >
                  View bag
                </button>
              </Link>
              <button className={s.checkOut} type="button">
                Check out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MiniCartDropDown.propTypes = {
  items: PropTypes.object,
  currencySymbol: PropTypes.string,
  onCartClicked: PropTypes.func,
};
