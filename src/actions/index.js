import { treesRef, cansRef, planetRef } from "../database/firebase";
import oceanVectors from "../database/oceanVectors.json";
import {
  FETCH_TREES,
  FETCH_CANS,
  FETCH_PLANET,
  SET_ZOOMED_OUT,
  SET_PLANTABLE,
  SET_HOVER,
  SET_TOOL
} from "./types";

export const addTree = newTree => async dispatch => {
  treesRef.push().set(newTree);
};
export const destroyCan = id => async dispatch => {
  cansRef.child(id).remove();
};
export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TREES,
      payload: snapshot.val()
    });
  });
};

export const fetchPlanetEnd = () => async dispatch => {
  planetRef.on("value", snapshot => {
    dispatch({
      type: FETCH_PLANET,
      payload: snapshot.val()
    });
  });
};

export const fetchCans = () => async dispatch => {
  cansRef.on("value", snapshot => {
    Object.keys(snapshot.val()).map(canId => {
      if (!snapshot.val()[canId].pos) {
        cansRef
          .child(`${canId}/pos`)
          .set(oceanVectors[Math.floor(Math.random() * oceanVectors.length)]);
      }
    });
    dispatch({
      type: FETCH_CANS,
      payload: snapshot.val()
    });
  });
};

export const setTool = name => async dispatch => {
  dispatch({
    type: SET_TOOL,
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
