import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateItemCartAttr, removeItemFromCart } from "../../../redux/actions";
import { getCurrentPrice } from "../../../helpers/pricesAndQuantity";
import ItemInCartRight from "./ItemInCartRight/ItemInCartRight";
import s from "./ItemInCart.module.scss";

class ItemInCart extends React.Component {
  render() {
    const {
      currencySymbol,
      item,
      index,
      isCartPage,
      updateItemCartAttr,
      removeItemFromCart,
    } = this.props;

    const test;

    const price = getCurrentPrice(currencySymbol, item.data.prices);

    return (
      <div className={`${s.itemInCart} ${isCartPage ? s.cartPage : ""}`}>
        <div className={s.itemWrapperLeft}>
          <div className={s.itemInfo}>
            <div className={s.itemName}>{item.data.name}</div>
            <div className={s.itemBrand}>{item.data.brand}</div>
          </div>

          <div className={s.itemPrice}>
            {price.currency.symbol}
            {price.amount}
          </div>

          <div className={s.itemAttributes}>
            {item.data.attributes.map((attr, attrIndex) => (
              <div
                className={s.attrWrapper}
                key={
                  (isCartPage ? "cart" : "minicart") +
                  "attr" +
                  attr.id +
                  index +
                  item.data.id
                }
              >
                <div className={s.attrName}>{attr.name}:</div>
                {/* Attribute Radio Buttons  */}
                <div className={s.attribute}>
                  {/* getting each product attritube (size, color) */}
                  {attr.items.map((attrItem, attrItemIndex) => {
                    if (attr.id === "Color") {
                      return (
                        <div
                          className={s.radioBtnWrapper}
                          key={
                            (isCartPage ? "cart" : "minicart") +
                            attrItem.value +
                            index
                          }
                        >
                          <input
                            id={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                            type="radio"
                            name={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              index +
                              item.data.id
                            }
                            value={attrItem.value}
                            defaultChecked={attrItem.isChecked}
                            onChange={() =>
                              updateItemCartAttr(
                                item.data.id,
                                index,
                                attrIndex,
                                attrItemIndex
                              )
                            }
                          ></input>
                          <label
                            className={s.coloredLabel}
                            htmlFor={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                            style={{ background: attrItem.value }}
                          ></label>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={s.radioBtnWrapper}
                          key={attrItem.value + index}
                        >
                          <input
                            id={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                            type="radio"
                            name={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              index +
                              item.data.id
                            }
                            value={attrItem.value}
                            defaultChecked={attrItem.isChecked}
                            onChange={() =>
                              updateItemCartAttr(
                                item.data.id,
                                index,
                                attrIndex,
                                attrItemIndex
                              )
                            }
                          ></input>
                          <label
                            htmlFor={
                              (isCartPage ? "cart" : "minicart") +
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                          >
                            {attrItem.value}
                          </label>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ItemInCartRight
          item={item}
          index={index}
          isCartPage={isCartPage}
          removeItemFromCart={removeItemFromCart}
        />
      </div>
    );
  }
}

ItemInCart.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  currencySymbol: PropTypes.string,
  isCartPage: PropTypes.bool,
  updateItemCartAttr: PropTypes.func,
  removeItemFromCart: PropTypes.func,
};

const mapDispatchToProps = {
  updateItemCartAttr,
  removeItemFromCart,
};

export default connect(null, mapDispatchToProps)(ItemInCart);