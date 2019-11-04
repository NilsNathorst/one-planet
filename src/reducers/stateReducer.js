import {
  SET_TOOL,
  SET_HOVER,
  SET_PLANTABLE,
  SET_ZOOMED_OUT,
  FETCH_CANS,
  FETCH_TREES,
  FETCH_PLANET
} from "../actions/types";

const initState = {
  name: "",
  hoverActive: false,
  plantable: false,
  zoomedOut: false,
  cans: [],
  trees: [],
  planet_end: null
};

const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOOL:
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
    case FETCH_CANS:
      return {
        ...state,
        cans: action.payload
      };
    case FETCH_TREES:
      return {
        ...state,
        trees: action.payload
      };
    case SET_ZOOMED_OUT:
      return {
        ...state,
        zoomedOut: action.payload
      };
    case FETCH_PLANET:
      return {
        ...state,
        planet_end: action.payload
      };
    default:
      return state;
  }
};

export default stateReducer;
