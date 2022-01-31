import { combineReducers } from "redux";
import { currenciesReducer } from "./currenciesReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
  currencies: currenciesReducer,
  cart: cartReducer,
});
