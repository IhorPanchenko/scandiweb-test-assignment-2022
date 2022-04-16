import React from "react";
import PropTypes from "prop-types";
import "../ProductDetail.scss";

export class ProductDetailAttributes extends React.Component {
  render() {
    const { product, onChangeAttribute } = this.props;

    return (
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
                        onChange={() => onChangeAttribute(attrIndex, index)}
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
                        onChange={() => onChangeAttribute(attrIndex, index)}
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
    );
  }
}

ProductDetailAttributes.propTypes = {
  match: PropTypes.object,
  product: PropTypes.object,
  currencySymbol: PropTypes.string,
  addToCart: PropTypes.func,
  onChangeAttribute: PropTypes.func,
};
