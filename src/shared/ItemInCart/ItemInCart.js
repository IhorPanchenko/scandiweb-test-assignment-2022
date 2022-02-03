import React from "react";
import { connect } from "react-redux";
import { updateItemCartQuantity } from "../../redux/actions";
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
    const { currencySymbol, item, index, isCartPage } = this.props;
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
            {item.data.attributes.map((attr) => (
              <div className={s.attrWrapper}>
                <div className={s.attrName}>{attr.name}:</div>
                {/* Attribute Radio Buttons  */}
                <div className={s.attribute}>
                  {/* getting each product attritube (size, color) */}
                  {attr.items.map((attrItem) => {
                    if (attr.id === "Color") {
                      return (
                        <div className={s.radioBtnWrapper}>
                          <input
                            id={
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                            type="radio"
                            name={
                              attr.id.replace(" ", "") + index + item.data.id
                            }
                            value={attrItem.value}
                          ></input>
                          <label
                            className={s.coloredLabel}
                            htmlFor={
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
                        <div className={s.radioBtnWrapper}>
                          <input
                            id={
                              attr.id.replace(" ", "") +
                              attrItem.id +
                              index +
                              item.data.id
                            }
                            type="radio"
                            name={
                              attr.id.replace(" ", "") + index + item.data.id
                            }
                            value={attrItem.value}
                          ></input>
                          <label
                            htmlFor={
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
              className={s.addBtn}
              type="button"
              onClick={() => this.updateQuantity(true)}
            >
              <GlobalSvgSelector id="add-item" />
            </button>
            <div className={s.quantity}>{item.quantity}</div>
            <button
              className={s.removeBtn}
              type="button"
              onClick={() => this.updateQuantity(false)}
            >
              <GlobalSvgSelector id="remove-item" />
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
};

export default connect(null, mapDispatchToProps)(ItemInCart);
