import { ADD_TO_CART, ADD_QUANTITY, GET_TOTAL } from "./types";

const initialState = {
  items: [],
  //cartItems: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.payload] };

    // case ADD_QUANTITY:
    //   let updatedCart = state.items.map((currentItem) => {
    //     if (currentItem.id === action.payload) {
    //       return { ...currentItem, quantity: currentItem.quantity + 1 };
    //     }
    //     return currentItem;
    //   });
    //   return { ...state, items: updatedCart };

    default:
      return state;
  }
};
