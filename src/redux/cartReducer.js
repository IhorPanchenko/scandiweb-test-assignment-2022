import { ADD_TO_CART, UPDATE_ITEM_QUANTITY, REMOVE_FROM_CART } from "./types";

const initialState = {
  items: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cartItems = JSON.parse(JSON.stringify(state.items));
      const obj = action.payload;
      const objCopy = JSON.stringify(action.payload);

      if (!cartItems[obj.id]) {
        cartItems[obj.id] = [];

        cartItems[obj.id].push({
          data: obj,
          quantity: 1,
        });
      } else {
        for (let item of cartItems[obj.id]) {
          const itemCopy = JSON.stringify(item.data);

          if (itemCopy === objCopy) {
            item.quantity += 1;
          } else {
            cartItems[obj.id].push({
              data: obj,
              quantity: 1,
            });
          }
        }
      }
      return { ...state, items: cartItems };

    case UPDATE_ITEM_QUANTITY: {
      const cartItems = JSON.parse(JSON.stringify(state.items));
      cartItems[action.id][action.index].quantity = action.payload;
      return { ...state, items: cartItems };
    }

    case REMOVE_FROM_CART: {
    }

    default:
      return state;
  }
};
