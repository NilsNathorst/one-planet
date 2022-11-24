import { treesRef, cansRef, planetRef } from "../database/firebase";
import oceanVectors from "../database/oceanVectors.json";
import {
  FETCH_TREES,
  FETCH_CANS,
  FETCH_PLANET,
  SET_SHOWINFO,
  SET_PLANTABLE,
  SET_PLANET_DEAD,
} from "./types";

export const addTree = (newTree) => async (dispatch) => {
  treesRef.push().set(newTree);
};
export const fetchTrees = () => async (dispatch) => {
  let trees = [];
  treesRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      trees = snapshot.val();
      console.log(trees);
      Object.keys(trees).map((treeId) => {
        if (trees[treeId].age === "newborn" && trees[treeId].id === "") {
          treesRef.child(`${treeId}/id`).set(treeId);
        }
        if (trees[treeId] !== "was removed") {
          const TreeAge = Date.now() - snapshot.val()[treeId].created_at;
          if (TreeAge > 1000 * 60 && snapshot.val()[treeId].age === "newborn") {
            treesRef.child(`${treeId}/needsWater`).set("true");
          }
          if (trees[treeId].needsWater === "true" && TreeAge > 1000 * 60 * 30) {
            treesRef.child(`${treeId}`).set("was removed");
          }
          if (
            trees[treeId].age !== "newborn" &&
            trees[treeId].needsWater === "false"
          ) {
            if (TreeAge > 1000 * 60 * 60 * 6 && TreeAge < 1000 * 60 * 60 * 12) {
              treesRef.child(`${treeId}/age`).set("adult");
            }
            if (
              TreeAge > 1000 * 60 * 60 * 12 &&
              TreeAge < 1000 * 60 * 60 * 18
            ) {
              treesRef.child(`${treeId}/age`).set("senior");
            }
            if (
              TreeAge > 1000 * 60 * 60 * 18 &&
              TreeAge < 1000 * 60 * 60 * 19
            ) {
              treesRef.child(`${treeId}/age`).set("dead");
            }
            if (TreeAge > 1000 * 60 * 60 * 19) {
              treesRef.child(`${treeId}`).set("was removed");
            }
          }
        }
      });
    }
    dispatch({
      type: FETCH_TREES,
      payload: trees,
    });
  });
};

export const setTreeActive = (id) => async (dispatch) => {
  treesRef.once("value", (snapshot) => {
    if (Date.now() - snapshot.val()[id].created_at < 1000 * 60 * 30);
    treesRef.child(`${id}/age`).set("young");
    treesRef.child(`${id}/needsWater`).set("false");
    treesRef.child(`${id}/created_at`).set(Date.now());
    planetRef.once("value", (snapshot) => {
      planetRef
        .child(`/planetEnd`)
        .set(snapshot.val().planetEnd + 1000 * 60 * 60);
      planetRef.child(`/treesAdded`).set(snapshot.val().treesAdded + 1);
    });
  });
};

export const destroyCan = (id) => async (dispatch) => {
  cansRef.child(id).set("was removed");
};

export const fetchCans = () => async (dispatch) => {
  cansRef.on("value", (snapshot) => {
    snapshot.val() &&
      Object.keys(snapshot.val()).map((canId) => {
        if (
          !snapshot.val()[canId].id &&
          snapshot.val()[canId] !== "was removed"
        ) {
          const color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
            Math.random() * 255
          )},${Math.floor(Math.random() * 255)})`;
          const pos =
            oceanVectors[Math.floor(Math.random() * oceanVectors.length)];

          cansRef.child(`${canId}`).set({ id: canId, pos: pos, color: color });
        }
        return null;
      });
    dispatch({
      type: FETCH_CANS,
      payload: snapshot.val(),
    });
  });
};

export const flushCansDatabase = (id) => async (dispatch) => {
  cansRef.once("value", (snapshot) => {
    snapshot.val() &&
      Object.keys(snapshot.val()).map((canId) => {
        if (snapshot.val()[canId] === "was removed") {
          cansRef.child(`${canId}`).remove();
          planetRef.once("value", (snapshot) => {
            planetRef.child(`/cansRemoved`).set(snapshot.val().cansRemoved + 1);
          });
        }
        return null;
      });
  });
};

export const flushTreesDatabase = (id) => async (dispatch) => {
  treesRef.once("value", (snapshot) => {
    snapshot.val() &&
      Object.keys(snapshot.val()).map((treeId) => {
        if (
          snapshot.val()[treeId] === "was removed" ||
          snapshot.val()[treeId].pos === undefined
        ) {
          treesRef.child(`${treeId}`).remove();
        }
        return null;
      });
  });
};

export const setPlanetDead = () => async (dispatch) => {
  planetRef.once("value", (snapshot) => {
    if (snapshot.val().planetEnd < Date.now()) {
      planetRef.child(`/isDead`).set(true);
    }
    dispatch({
      type: SET_PLANET_DEAD,
      payload: snapshot.val().isDead,
    });
  });
};

export const fetchPlanet = () => async (dispatch) => {
  planetRef.on("value", (snapshot) => {
    dispatch({
      type: FETCH_PLANET,
      payload: snapshot.val(),
    });
  });
};

export const setShowInfo = (payload) => async (dispatch) => {
  dispatch({
    type: SET_SHOWINFO,
    payload: payload,
  });
};
export const setPlantable = (payload) => async (dispatch) => {
  dispatch({
    type: SET_PLANTABLE,
    payload: payload,
  });
};
