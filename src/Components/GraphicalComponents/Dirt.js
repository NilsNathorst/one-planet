import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";

import React, { useContext } from "react";
import Styled from "styled-components";
import { CursorContext } from "../Context/CursorContext";
import { connect } from "react-redux";
import { addTree } from "../../actions";
const Dirt = props => {
  console.log(props);
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  const { setHovering, setPlantable } = useContext(CursorContext);

  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        addTree(e.point);
      }}
      onPointerMove={e => {
        e.stopPropagation();

        if (e.point.length() > 80) {
          setPlantable(true);
        } else {
          setPlantable(false);
        }
      }}
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
      scale={[29.3, 29.3, 29.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};
const mapStateToProps = ({ data, state }) => {
  return {
    data,
    fart: state.hovering
  };
};
export default connect(
  mapStateToProps,
  { addTree }
)(Dirt);
