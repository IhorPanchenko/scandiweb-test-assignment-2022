import { SELECT_CURRENCY, ADD_TO_CART, ADD_QUANTITY } from "./types";

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

export function setCartItem(obj, cartItems) {
  const objCopy = JSON.stringify(obj);

  if (!cartItems[obj.id]) {
    cartItems[obj.id] = [];

    cartItems[obj.id].push({
      data: obj,
      quantity: 1
    });
  } else {
    for (let item of cartItems[obj.id]) {
      const itemCopy = JSON.stringify(item.data);

      if (itemCopy === objCopy) {
        item.quantity += 1;
      } else {
        cartItems[obj.id].push({
          data: obj,
          quantity: 1
        });
      }
    }
  }
}

// export function addItemQuantity(id) {
//   return dispatch({
//     type: ADD_QUANTITY,
//     payload: id,
//   });
// }
