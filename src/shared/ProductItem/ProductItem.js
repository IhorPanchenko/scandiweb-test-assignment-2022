import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { addToCart } from "../../redux/actions";
import { getCurrentPrice } from "../../helpers/prices";
import s from "./ProductItem.module.scss";

class ProductItem extends React.Component {
  render() {
    const { currencySymbol, product, addToCart } = this.props;
    const price = getCurrentPrice(currencySymbol, product.prices);

    return (
      <div
        className={
          s.productItem + " " + (!product.inStock && s.productItemInStock)
        }
      >
        {!product.inStock && (
          <div className={s.productOutOfStock}>Out of stock</div>
        )}

        <div className={s.buttonWrapper}>
          {product.inStock && (
            <button type="button" onClick={() => addToCart(product)}>
              <GlobalSvgSelector id="header-cart" />
            </button>
          )}

          <Link to={`/products/${product.id}`}>
            <div className={s.imgWrapper}>
              <img src={product.gallery[0]} className={s.productItemImg}></img>
            </div>
          </Link>
        </div>

        <Link to={`/products/${product.id}`}>
          <span className={s.productItemName}>{product.name}</span>
          <div className={s.itemPriceWrapper}>
            <span>{price.currency.symbol}</span>
            <span>{price.amount}</span>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.currencies.symbol,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
