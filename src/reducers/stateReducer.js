import {
  SET_TOOL,
  SET_HOVER,
  SET_PLANTABLE,
  SET_ZOOMED_OUT,
  SET_SHOWINFO,
  FETCH_CANS,
  FETCH_TREES,
  FETCH_PLANET,
  SET_PLANET_DEAD,
  SET_TREE_COOLDOWN
} from "../actions/types";

const initState = {
  name: "",
  showInfo: { active: false, object: {} },
  hoverActive: false,
  plantable: false,
  zoomedOut: false,
  cans: [],
  trees: [],
  planet: {},
  treeCooldown: false,
  isDead: false
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
        planet: action.payload
      };
    case SET_PLANET_DEAD:
      return {
        ...state,
        isDead: action.payload
      };
    case SET_TREE_COOLDOWN:
      return {
        ...state,
        treeCooldown: action.payload
      };
    default:
      return state;
  }
};

export default stateReducer;
