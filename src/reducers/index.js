import { combineReducers } from "redux";

import data from "./dataReducer";
import state from "./toolbarReducer";
import ui from "./interfaceReducer";
import cans from "./canReducer";

export default combineReducers({
  ui,
  data,
  state,
  cans
});
