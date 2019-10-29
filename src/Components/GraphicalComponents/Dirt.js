import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useContext } from "react";
import Styled from "styled-components";
import { CursorContext } from "../Context/CursorContext";
const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  const { setHovering, setPlantable } = useContext(CursorContext);

  return (
    <mesh
      receiveShadow
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

export default Dirt;
