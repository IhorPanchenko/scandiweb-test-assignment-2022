import React from "react";
import s from "./ItemInCart.module.scss";
import { GlobalSvgSelector } from "../../assets/images/GlobalSvgSelector";
import { getCurrentPrice } from "../../helpers/prices";
import CartSlider from "../../shared/ImageSliders/CartSlider/CartSlider";

export class ItemInCart extends React.Component {
  render() {
    const { currencySymbol, item, index, isCartPage } = this.props;
    const price = getCurrentPrice(currencySymbol, item.prices);
    // className={`description ${
    //   !isActive &&
    //   product.description.length > 200
    //     ? "shadowBottom"
    //     : ""
    // }`}
    return (
      <div className={`${s.itemInCart} ${isCartPage ? s.cartPage : ""}`}>
        <div className={s.itemWrapperLeft}>
          <div className={s.itemInfo}>
            <div className={s.itemName}>{item.name}</div>
            <div className={s.itemBrand}>{item.brand}</div>
          </div>

          <div className={s.itemPrice}>
            {price.currency.symbol}
            {price.amount}
          </div>

          <div className={s.itemAttributes}>
            {item.attributes.map((att) => (
              <div className={s.attWrapper}>
                <div className={s.attName}>{att.name}:</div>
                {/* Attribute Radio Buttons  */}
                <div className={s.attribute}>
                  {/* getting each product attritube (size, color) */}
                  {att.items.map((item) => {
                    if (att.id === "Color") {
                      return (
                        <div className={s.radioBtnWrapper}>
                          <input
                            id={att.id.replace(" ", "") + item.id + index}
                            type="radio"
                            name={att.id.replace(" ", "") + index}
                            value={item.value}
                          ></input>
                          <label
                            className={s.coloredLabel}
                            htmlFor={att.id.replace(" ", "") + item.id + index}
                            style={{ background: item.value }}
                          ></label>
                        </div>
                      );
                    } else {
                      return (
                        <div className={s.radioBtnWrapper}>
                          <input
                            id={att.id.replace(" ", "") + item.id + index}
                            type="radio"
                            name={att.id.replace(" ", "") + index}
                            value={item.value}
                          ></input>
                          <label
                            htmlFor={att.id.replace(" ", "") + item.id + index}
                          >
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
        </div>

        <div className={s.itemWrapperRight}>
          <div className={s.addRemoveBtnWrapper}>
            <button className={s.addBtn} type="button">
              <GlobalSvgSelector id="add-item" />
            </button>
            <div className={s.quantity}>1</div>
            <button className={s.removeBtn} type="button">
              <GlobalSvgSelector id="remove-item" />
            </button>
          </div>

          <div className={s.itemImgWrapper}>
            {isCartPage ? (
              <CartSlider gallery={item.gallery} />
            ) : (
              <img className={s.itemImg} src={item.gallery[0]}></img>
            )}
          </div>
        </div>
      </div>
    );
  }
}
