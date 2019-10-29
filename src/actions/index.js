import { treesRef } from "../database/firebase";
import { FETCH_TREES } from "./types";
import { SET_STATE } from "./types";

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
export const setTool = name => async dispatch => {
  dispatch({
    type: SET_STATE,
    payload: name
  });
};
// setTool: name => {
//   dispatch({ type: "SET_STATE", payload: name });
// }
