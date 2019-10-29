import { ACTIVE_TOOL } from "../actions/types";

const initState = {
  activeTool: { name: "", isHovering: false }
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTIVE_TOOL:
      return (state.activeTool.name = action.text);

    default:
      return state;
  }
};
