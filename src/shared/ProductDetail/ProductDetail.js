import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions";
import { client } from "../../index";
import { getProductDetails } from "../../helpers/gqlQueries";
import { setIsCheckedParam } from "../../helpers/changeProductAttr";
import { getCurrentPrice } from "../../helpers/pricesAndQuantity";
import ProductDetailsSlider from "../ImageSliders/ProductDetailsSlider/ProductDetailsSlider";
import "./ProductDetail.scss";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
      error: false,
      isActive: false,
      price: {},
    };
  }

  getData() {
    client
      .query({
        query: getProductDetails(this.props.match.params.productId),
      })
      .then(({ loading, error, data }) => {
        this.setState({
          product: setIsCheckedParam(data.product),
          loading,
          error,
        });
        this.getPrice();
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currencySymbol !== this.props.currencySymbol) {
      this.getPrice();
    }
  }

  getPrice() {
    this.setState({
      price: getCurrentPrice(
        this.props.currencySymbol,
        this.state.product.prices
      ),
    });
  }

  addToCartClick() {
    this.props.addToCart(this.state.product);
  }

  handleToggle() {
    this.setState({ isActive: !this.state.isActive });
  }

  onChangeAttribute(attrIndex, itemIndex) {
    const newProductData = JSON.parse(JSON.stringify(this.state.product));
    const newAttributesData = newProductData.attributes[attrIndex].items.map(
      (item, index) => ({
        ...item,
        isChecked: index === itemIndex ? true : false,
      })
    );

    newProductData.attributes[attrIndex].items = newAttributesData;
    this.setState({
      product: newProductData,
    });
  }

  render() {
    const { product, isActive, price } = this.state;

    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: </p>;

    return (
      <div className="productDetails">
        {/* Product Images Block */}
        <div className="galleryWrapper">
          <ProductDetailsSlider gallery={product.gallery} />
        </div>

        {/* Product Details Block */}
        <div className="prodDetailsWrapper">
          <div className="prodNameWrapper">
            {!product.inStock && (
              <span className="outOfStock">Out of stock</span>
            )}
            <span className="prodName">{product.name}</span>
            <span className="prodBrand">{product.brand}</span>
          </div>

          <div className="attributes">
            {product.attributes.map((attr, attrIndex) => (
              <div className="attWrapper" key={attr.id}>
                <div className="attName">{attr.name}:</div>
                {/* Attribute Radio Buttons  */}
                <div className="radioBtns">
                  {/* getting each product attritube (size, color) */}
                  {attr.items.map((item, index) => {
                    if (attr.id === "Color") {
                      return (
                        <div
                          className="radioBtnWrapper"
                          key={attr.id.replace(" ", "") + item.id}
                        >
                          <input
                            id={attr.id.replace(" ", "") + item.id}
                            type="radio"
                            name={attr.id.replace(" ", "")}
                            value={item.value}
                            defaultChecked={item.isChecked}
                            onChange={this.onChangeAttribute.bind(
                              this,
                              attrIndex,
                              index
                            )}
                          ></input>
                          <label
                            className="coloredLabel"
                            htmlFor={attr.id.replace(" ", "") + item.id}
                            style={{ background: item.value }}
                          ></label>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="radioBtnWrapper"
                          key={attr.id.replace(" ", "") + item.id}
                        >
                          <input
                            id={attr.id.replace(" ", "") + item.id}
                            type="radio"
                            name={attr.id.replace(" ", "")}
                            value={item.value}
                            defaultChecked={item.isChecked}
                            onChange={this.onChangeAttribute.bind(
                              this,
                              attrIndex,
                              index
                            )}
                          ></input>
                          <label htmlFor={attr.id.replace(" ", "") + item.id}>
                            {item.value}
                          </label>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="priceWrapper">
            <span>Price:</span>
            <div className="price">
              <span>{price?.currency?.symbol}</span>
              <span>{price?.amount}</span>
            </div>
          </div>

          <button
            className={`${!product.inStock ? "inactive" : ""}`}
            type="button"
            onClick={this.addToCartClick.bind(this)}
          >
            Add to cart
          </button>

          <div className={`descriptionWrapper ${isActive ? "showDesc" : ""}`}>
            {/* parsing product description as a html */}
            <div
              className={`description ${
                !isActive && product.description.length > 200
                  ? "shadowBottom"
                  : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></div>

            {product.description.length > 200 && (
              <div className="showMore" onClick={this.handleToggle.bind(this)}>
                {isActive ? "Show less" : "Show more..."}
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
