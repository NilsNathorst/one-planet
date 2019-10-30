import { SET_ZOOMED_OUT } from "../actions/types";

const iState = {
  zoomedOut: false
};

const interfaceReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_ZOOMED_OUT:
      return {
        ...state,
        zoomedOut: action.payload
      };
  }
  return state;
};

export default interfaceReducer;
