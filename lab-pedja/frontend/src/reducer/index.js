import { combineReducers } from "redux";

import countries from "./countries";
import expenses from "./expenses";

export default combineReducers({
  countries,
  expenses,
})