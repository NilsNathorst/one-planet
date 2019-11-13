import {
  SET_TOOL,
  SET_HOVER,
  SET_PLANTABLE,
  SET_ZOOMED_OUT,
  SET_SHOWINFO,
  FETCH_CANS,
  FETCH_TREES,
  FETCH_PLANET,
  FETCH_LAST_PLANTED,
  SET_PLANET_DEAD
} from "../actions/types";

const initState = {
  name: "",
  showInfo: { active: false, object: {}, pos: { x: 0, y: 0 } },
  hoverActive: false,
  plantable: false,
  zoomedOut: false,
  cans: [],
  trees: [],
  planet_end: null,
  isDead: false,
  last_planted: null
};

const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOOL:
      return {
        ...state,
        name: action.payload
      };
    case SET_SHOWINFO:
      return {
        ...state,
        showInfo: action.payload
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
    case FETCH_LAST_PLANTED:
      return {
        ...state,
        last_planted: action.payload
      };
    case SET_PLANET_DEAD:
      return {
        ...state,
        isDead: action.payload
      };
    default:
      return state;
  }
};

export default stateReducer;
