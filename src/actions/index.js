import { treesRef } from "../database/firebase";
import { FETCH_TREES } from "./types";
import { ACTIVE_TOOL } from "./types";

export const addTree = newTree => {
  treesRef.push().set(newTree);
};

export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TREES,
      payload: snapshot.val()
    });
  });
};
export const setTool = text => {
  return {
    type: ACTIVE_TOOL,
    text
  };
};
