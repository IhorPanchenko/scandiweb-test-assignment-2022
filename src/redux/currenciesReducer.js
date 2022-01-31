import { SELECT_CURRENCY } from "./types";

const initialState = {
  symbol: "$",
};

export const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CURRENCY:
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
};
