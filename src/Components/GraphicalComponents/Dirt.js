import React, { useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect, useDispatch } from "react-redux";
import { addTree } from "../../actions";

const Dirt = ({ name, plantable, addTree }) => {
  const dispatch = useDispatch();
  const setDispatch = useCallback(
    (type, value) => dispatch({ type: type, payload: value }),
    [dispatch]
  );

  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        if (plantable && name === "TREE") {
          addTree({
            pos: e.point,
            created_at: Date.now(),
            age: "young"
          });
        }
      }}
      onPointerMove={e => {
        if (name === "TREE") {
          e.stopPropagation();
          if (e.point.length() > 80 && plantable === false) {
            setDispatch("SET_PLANTABLE", true);
          } else if (e.point.length() < 80 && plantable === true) {
            setDispatch("SET_PLANTABLE", false);
          }
        }
      }}
      onPointerOver={() => name === "TREE" && setDispatch("SET_HOVER", true)}
      onPointerOut={() => name === "TREE" && setDispatch("SET_HOVER", true)}
      scale={[29.3, 29.3, 29.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};
const mapStateToProps = ({ state: { name, plantable } }) => {
  return {
    name,
    plantable
  };
};

export default connect(
  mapStateToProps,
  { addTree }
)(Dirt);
