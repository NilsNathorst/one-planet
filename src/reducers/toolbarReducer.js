import { SET_STATE } from "../actions/types";

const iState = {
  name: "",
  hoverActive: false
};

const toolbarReducer = (state = iState, action) => {
  if (action.type === SET_STATE) {
    return {
      ...state,
      name: action.payload,
      hoverActive: true
    };
  }
  return state;
};

export default toolbarReducer;
