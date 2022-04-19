import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateItemCartAttr } from "../../../../redux/actions";
import s from "../ItemInCart.module.scss";

class ItemInCartAttributes extends React.Component {
  render() {
    const {
      item,
      index,
      isCartPage,
      updateItemCartAttr,
    } = this.props;

    return (
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
                        checked={attrItem.isChecked}
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
                        checked={attrItem.isChecked}
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
    );
  }
}

ItemInCartAttributes.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isCartPage: PropTypes.bool,
  updateItemCartAttr: PropTypes.func,
};

const mapDispatchToProps = {
  updateItemCartAttr,
};

export default connect(null, mapDispatchToProps)(ItemInCartAttributes);
