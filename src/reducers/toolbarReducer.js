import { SET_STATE } from "../actions/types";
import { SET_HOVER } from "../actions/types";
import { SET_PLANTABLE } from "../actions/types";

const iState = {
  name: "",
  hoverActive: false,
  plantable: false
};

const toolbarReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        name: action.payload
      };
    case SET_HOVER:
      return {
        ...state,
        hoverActive: action.payload
      };
    case SET_PLANTABLE:
      return {
        ...state,
        plantable: action.payload
      };
  }
  return state;
};

export default toolbarReducer;
