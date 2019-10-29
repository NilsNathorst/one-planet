import { treesRef } from "../database/firebase";
import { FETCH_TREES } from "./types";

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
