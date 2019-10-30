import { treesRef } from "../database/firebase";
import {
  FETCH_TREES,
  SET_ZOOMED_OUT,
  SET_PLANTABLE,
  SET_HOVER,
  SET_STATE
} from "./types";

export const addTree = newTree => async dispatch => {
  treesRef.push().set(newTree);
};

export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    console.log("fetched trees");
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
export const setHover = bool => async dispatch => {
  dispatch({
    type: SET_HOVER,
    payload: bool
  });
};
export const setPlantable = bool => async dispatch => {
  dispatch({
    type: SET_PLANTABLE,
    payload: bool
  });
};
export const setZoomedOut = bool => async dispatch => {
  dispatch({
    type: SET_ZOOMED_OUT,
    payload: bool
  });
};
