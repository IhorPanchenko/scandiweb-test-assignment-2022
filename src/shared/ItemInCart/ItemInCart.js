import React from "react";
import { connect } from "react-redux";
import {
  updateItemCartQuantity,
  updateItemCartAttr,
  removeItemFromCart,
} from "../../redux/actions";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { getCurrentPrice } from "../../helpers/pricesAndQuantity";
import CartSlider from "../../shared/ImageSliders/CartSlider/CartSlider";
import s from "./ItemInCart.module.scss";

class ItemInCart extends React.Component {
  updateQuantity(isIncrement) {
    const { item, index, updateItemCartQuantity } = this.props;
    const newQuantity = isIncrement ? item.quantity + 1 : item.quantity - 1;
    if (!isIncrement && newQuantity < 0) return;
    updateItemCartQuantity(item.data.id, index, newQuantity);
  }

  render() {
    const {
      currencySymbol,
      item,
      index,
      isCartPage,
      updateItemCartAttr,
      removeItemFromCart,
    } = this.props;
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

        <div className={s.itemWrapperRight}>
          <div className={s.addRemoveBtnWrapper}>
            <button
              className={s.increaseBtn}
              type="button"
              onClick={() => this.updateQuantity(true)}
            >
              <GlobalSvgSelector id="increase-quantity" />
            </button>

            <div className={s.quantity}>{item.quantity}</div>
            <button
              className={s.decreaseBtn}
              type="button"
              onClick={() => this.updateQuantity(false)}
            >
              <GlobalSvgSelector id="decrease-quantity" />
            </button>

            <button
              className={`deleteBtn ${s.removeItem}`}
              type="button"
              onClick={() => removeItemFromCart(item.data.id, index)}
            >
              <GlobalSvgSelector id="cart-bin" />
            </button>
          </div>

          <div className={s.itemImgWrapper}>
            {isCartPage ? (
              <CartSlider gallery={item.data.gallery} />
            ) : (
              <img
                className={s.itemImg}
                src={item.data.gallery[0]}
                alt={item.data.name}
              ></img>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateItemCartQuantity,
  updateItemCartAttr,
  removeItemFromCart,
};

export default connect(null, mapDispatchToProps)(ItemInCart);
