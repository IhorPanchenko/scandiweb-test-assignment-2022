import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { getTotalPrice } from "../../helpers/prices";
import ItemInCart from "../ItemInCart/ItemInCart";
import s from "./MiniCart.module.scss";

class MiniCart extends React.Component {
  // componentDidUpdate(prevProps) {
  //   if (JSON.stringify(prevProps)) {
      
  //   }
  // }

  render() {
    const { items, currencySymbol, isOpen, onCartClicked } = this.props;
    const total = getTotalPrice(items, currencySymbol);

    return (
      <div className={s.cartWrapper}>
        {isOpen && <div className={s.pageBlackOut}></div>}
        <div
          className={s.cartIcon}
          onClick={(e) => {
            e.stopPropagation();
            onCartClicked();
          }}
        >
          <GlobalSvgSelector id="header-cart" />
          {Object.keys(items).length > 0 && (
            <div className={s.itemsInCart}>{Object.keys(items).length}</div>
          )}
        </div>

        {isOpen && (
          <div className={`drop-down-cart ${s.dropdownCart}`}>
            {/* if cart is empty */}
            {!Object.keys(items).length ? (
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
                      {Object.keys(items).length}{" "}
                      {Object.keys(items).length === 1 ? "item" : "items"}
                    </span>
                  </span>
                </div>

                <div className={s.itemInCartWrapper}>
                  {Object.keys(items).map((key) =>
                    items[key].map((item, index) => (
                      <ItemInCart
                        key={item.data.id + index}
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
                    {total}
                  </div>
                </div>
                {/* Cart Buttons */}
                <div className={s.cartBtnWrapper}>
                  <Link to="/cart">
                    <button
                      className={s.viewBag}
                      type="button"
                      onClick={(e) => {
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
        )}
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

export default connect(mapStateToProps, null)(MiniCart);
