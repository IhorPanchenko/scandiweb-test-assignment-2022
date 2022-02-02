import { SELECT_CURRENCY, ADD_TO_CART, UPDATE_ITEM_QUANTITY } from "./types";

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
  console.log("id, .....", id, index, quantity);
  return {
    id,
    index,
    type: UPDATE_ITEM_QUANTITY,
    payload: quantity,
  };
}
