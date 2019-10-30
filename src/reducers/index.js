import { combineReducers } from "redux";

import data from "./dataReducer";
import state from "./toolbarReducer";

export default combineReducers({
  data,
  state
});
