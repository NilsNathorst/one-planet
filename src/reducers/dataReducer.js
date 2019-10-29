import { FETCH_TREES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TREES:
      return action.payload;
    default:
      return state;
  }
};
