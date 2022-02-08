import {
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  UPDATE_ITEM_ATTRIBUTES,
  REMOVE_FROM_CART,
} from "./types";

const initialState = {
  items: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cartItems = JSON.parse(JSON.stringify(state.items));
      const obj = action.payload;
      const objCopy = JSON.stringify(action.payload);
      const cartItemsById = cartItems[obj.id];

      if (!cartItems[obj.id]) {
        cartItems[obj.id] = [];
      }

      if (!cartItems[obj.id].length) {
        cartItems[obj.id].push({
          data: obj,
          quantity: 1,
        });
      } else {
        for (let [index, item] of cartItemsById.entries()) {
          const itemCopy = JSON.stringify(item.data);

          if (itemCopy !== objCopy) {
            if (index === cartItemsById.length - 1) {
              cartItems[obj.id].push({
                data: obj,
                quantity: 1,
              });

              break;
            }
          } else {
            item.quantity += 1;
          }
        }
      }
      return { ...state, items: cartItems };

    case UPDATE_ITEM_QUANTITY: {
      const cartItems = JSON.parse(JSON.stringify(state.items));
      cartItems[action.id][action.index].quantity = action.payload;
      return { ...state, items: cartItems };
    }

    case UPDATE_ITEM_ATTRIBUTES: {
      const cartItems = JSON.parse(JSON.stringify(state.items));
      const newAttributesData = cartItems[action.id][
        action.index
      ].data.attributes[action.attrIndex].items.map((item, index) => ({
        ...item,
        isChecked: index === action.payload ? true : false,
      }));

      cartItems[action.id][action.index].data.attributes[
        action.attrIndex
      ].items = newAttributesData;

      return { ...state, items: cartItems };
    }

    case REMOVE_FROM_CART: {
      const cartItems = JSON.parse(JSON.stringify(state.items));
      cartItems[action.id] = cartItems[action.id].filter(
        (item, index) => index !== action.index
      );
      return { ...state, items: cartItems };
    }

    default:
      return state;
  }
};
