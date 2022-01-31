import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import s from "./MiniCart.module.scss";
import { getTotalPrice } from "../../helpers/prices";
import { ItemInCart } from "../ItemInCart/ItemInCart";

class MiniCart extends React.Component {
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
          {items.length > 0 && (
            <div className={s.itemsInCart}>{items.length}</div>
          )}
        </div>

        {isOpen && (
          <div className={`drop-down-cart ${s.dropdownCart}`}>
            {/* if cart is empty */}
            {!items.length ? (
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
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </span>
                </div>

                <div className={s.itemInCartWrapper}>
                  {items.map((item, index) => (
                    <ItemInCart
                      item={item}
                      currencySymbol={currencySymbol}
                      index={index}
                    />
                  ))}
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

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
