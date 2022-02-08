import {
  SELECT_CURRENCY,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  UPDATE_ITEM_ATTRIBUTES,
  REMOVE_FROM_CART,
} from "./types";

export function selectCurrency(currencySymbol) {
  return {
    type: SELECT_CURRENCY,
    payload: currencySymbol,
  };
}

export function addToCart(obj) {
  return {
    type: ADD_TO_CART,
    payload: obj,
  };
}

export function updateItemCartQuantity(id, index, quantity) {
  return {
    id,
    index,
    type: UPDATE_ITEM_QUANTITY,
    payload: quantity,
  };
}

export function updateItemCartAttr(id, index, attrIndex, attrItemIndex) {
  return {
    id,
    index,
    attrIndex,
    type: UPDATE_ITEM_ATTRIBUTES,
    payload: attrItemIndex,
  };
}

export function removeItemFromCart(id, index) {
  return {
    id,
    index,
    type: REMOVE_FROM_CART,
  };
}
