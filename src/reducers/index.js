import { combineReducers } from "redux";

import data from "./dataReducer";
import toolbar from "./toolbarReducer";

export default combineReducers({
  data,
  toolbar
});
