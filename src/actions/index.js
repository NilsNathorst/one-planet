import { treesRef, cansRef, planetRef } from "../database/firebase";
import oceanVectors from "../database/oceanVectors.json";
import { FETCH_TREES, FETCH_CANS, FETCH_PLANET } from "./types";

export const addTree = newTree => async dispatch => {
  treesRef.push().set(newTree);
};

export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    snapshot.val() &&
      Object.keys(snapshot.val()).map(treeId => {
        const TreeAge = Date.now() - snapshot.val()[treeId].created_at;
        treesRef.child(`${treeId}/id`).set(treeId);
        if (snapshot.val()[treeId].age !== "newborn") {
          if (TreeAge > 1000 * 60 * 60 * 6 && TreeAge < 1000 * 60 * 60 * 12) {
            treesRef.child(`${treeId}/age`).set("adult");
          }
          if (TreeAge > 1000 * 60 * 60 * 12 && TreeAge < 1000 * 60 * 60 * 18) {
            treesRef.child(`${treeId}/age`).set("senior");
          }
          if (TreeAge > 1000 * 60 * 60 * 18 && TreeAge < 1000 * 60 * 60 * 24) {
            treesRef.child(`${treeId}/age`).set("dead");
          }
          if (TreeAge > 5000 * 10 * 10 * 24) {
            treesRef.child(`${treeId}`).once("value", snapshot => {
              treesRef.child(`${treeId}`).remove();
            });
            planetRef.once("value", snapshot => {
              planetRef.set(snapshot.val() - 1000 * 60 * 30);
            });
          }
        }
        return null;
      });
    dispatch({
      type: FETCH_TREES,
      payload: snapshot.val()
    });
  });
};
export const setTreeActive = id => async dispatch => {
  treesRef.child(`${id}/age`).set("young");
  treesRef.child(`${id}/created_at`).set(Date.now());
  planetRef.once("value", snapshot => {
    planetRef.set(snapshot.val() + 1000 * 60 * 60);
  });
};

export const destroyCan = id => async dispatch => {
  cansRef.child(id).set("was removed");
};

export const fetchCans = () => async dispatch => {
  cansRef.on("value", snapshot => {
    Object.keys(snapshot.val()).map(canId => {
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
      payload: snapshot.val()
    });
  });
};

export const flushCansDatabase = id => async dispatch => {
  cansRef.once("value", snapshot => {
    Object.keys(snapshot.val()).map(canId => {
      if (snapshot.val()[canId] === "was removed") {
        cansRef.child(`${canId}`).remove();
      }
      return null;
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
