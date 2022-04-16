import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GlobalSvgSelector } from "../../../assets/images/GlobalSvgSelector";
import { getTotalPrice } from "../../../helpers/pricesAndQuantity";
import { MiniCartDropDown } from "./MiniCartDropDown/MiniCartDropDown";
import s from "./MiniCart.module.scss";

class MiniCart extends React.Component {
  render() {
    const { items, currencySymbol, isOpen, onCartClicked } = this.props;
    const { totalQuantity } = getTotalPrice(items, currencySymbol);

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
          {totalQuantity > 0 && (
            <div className={s.itemsInCart}>{totalQuantity}</div>
          )}
        </div>

        {isOpen && (
          <MiniCartDropDown
            items={items}
            currencySymbol={currencySymbol}
            isOpen={isOpen}
            onCartClicked={onCartClicked}
          />
        )}
      </div>
    );
  }
}

MiniCart.propTypes = {
  items: PropTypes.object,
  currencySymbol: PropTypes.string,
  isOpen: PropTypes.bool,
  onCartClicked: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    currencySymbol: state.currencies.symbol,
  };
};

export default connect(mapStateToProps)(MiniCart);
