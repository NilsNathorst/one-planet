import { FETCH_CANS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CANS:
      return action.payload;
    default:
      return state;
  }
};
