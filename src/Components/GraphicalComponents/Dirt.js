import React, { useCallback, useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect, useDispatch } from "react-redux";
import { addTree, fetchLastPlanted } from "../../actions";

const Dirt = ({ name, plantable, addTree, fetchLastPlanted, last_planted }) => {
  const dispatch = useDispatch();
  const setDispatch = useCallback(
    (type, value) => dispatch({ type: type, payload: value }),
    [dispatch]
  );
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");
  useEffect(() => {
    fetchLastPlanted();
  }, [fetchLastPlanted]);

  const TimeSinceLastPlanted = Date.now() - last_planted.created_at;


  return (
    <mesh
      ref={ref}
      receiveShadow
      onPointerDown={e => {
        if (plantable && name === "TREE") {
          addTree({
            pos: e.point,
            created_at: Date.now(),
            age: "newborn",
            id: "",
            needsWater: "false"
          });
          fetchLastPlanted();
        }
      }}
      onPointerMove={e => {
        e.stopPropagation();
        if (name === "TREE") {
          if (e.point.length() > 80 && plantable === false) {
            setDispatch("SET_PLANTABLE", true);
          } else if (e.point.length() < 80 && plantable === true) {
            setDispatch("SET_PLANTABLE", false);
          }
        }
      }}
      onPointerOver={() => name === "TREE" && setDispatch("SET_HOVER", true)}
      onPointerOut={() => name === "TREE" && setDispatch("SET_HOVER", true)}
      scale={[30.3, 30.3, 30.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};
const mapStateToProps = ({ state: { name, plantable, last_planted } }) => {
  return {
    name,
    plantable,
    last_planted
  };
};

export default connect(
  mapStateToProps,
  { addTree, fetchLastPlanted }
)(Dirt);
