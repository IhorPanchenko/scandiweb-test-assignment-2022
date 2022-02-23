import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { addToCart } from "../../redux/actions";
import { getCurrentPrice } from "../../helpers/pricesAndQuantity";
import { setIsCheckedParam } from "../../helpers/changeProductAttr";
import s from "./ProductItem.module.scss";

class ProductItem extends React.Component {
  render() {
    const { currencySymbol, addToCart } = this.props;
    const product = setIsCheckedParam(this.props.product);
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
              <img
                src={product.gallery[0]}
                className={s.productItemImg}
                alt={product.name}
              ></img>
            </div>
          </Link>
        </div>

        <Link to={`/products/${product.id}`}>
          <span className={s.productItemName}>{product.name}, </span>
          <span className={s.productItemBrand}>{product.brand}</span>
          <div className={s.itemPriceWrapper}>
            <span>{price.currency.symbol}</span>
            <span>{price.amount}</span>
          </div>
        </Link>
      </div>
    );
  }
}

ProductItem.propTypes = {
  currencySymbol: PropTypes.string,
  addToCart: PropTypes.func,
  product: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.currencies.symbol,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
