import { treesRef, cansRef, planetRef } from "../database/firebase";
import oceanVectors from "../database/oceanVectors.json";
import { FETCH_TREES, FETCH_CANS, FETCH_PLANET } from "./types";

export const addTree = newTree => async dispatch => {
  treesRef.push().set(newTree);
  planetRef.once("value", snapshot => {
    // Currently adds 24h to planet_end
    planetRef.set(snapshot.val() + 1000 * 60 * 60);
  });
};

export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    Object.keys(snapshot.val()).map(treeId => {
      const TreeAge = Date.now() - snapshot.val()[treeId].created_at;
      if (TreeAge > 3600000 * 2 && TreeAge < 360000 * 3) {
        treesRef.child(`${treeId}/age`).set("adult");
      }
      if (TreeAge > 3600000 * 5) {
        treesRef.child(`${treeId}/age`).set("dead");
      }
      if (!snapshot.val()[treeId].id) {
        treesRef.child(`${treeId}/id`).set({ treeId });
      }
      treesRef.child(`${treeId}/age`).once("value", snapshot => {
        if (snapshot.val() === "dead") {
          treesRef.child(`${treeId}`).remove();
          planetRef.once("value", snapshot => {
            // Currently removes 12h to planet_end
            planetRef.set(snapshot.val() - 1000 * 60 * 30);
          });
        }
      });
      return null;
    });
    dispatch({
      type: FETCH_TREES,
      payload: snapshot.val()
    });
  });
};

export const destroyCan = id => async dispatch => {
  cansRef.child(id).set("was removed");
};

export const fetchCans = () => async dispatch => {
  console.log("Fetched Cans");
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
    console.log("data flushed");
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
