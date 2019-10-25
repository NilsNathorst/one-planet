import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useState } from "react";
import Cursor from "../Tools/Cursor";
import { useThree } from "react-three-fiber";
const Ocean = () => {
  const { intersect } = useThree();
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();
  const [mousePos, setMousePos] = useState();
  return (
    <>
      <mesh
        name="Ocean"
        onPointerDown={e => {
          e.stopPropagation();
        }}
        recieveShadow
        ref={ref}
        scale={[29, 29, 29]}
        position={[0, 0, 0]}
      >
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial attach="material" color="dodgerblue" />
      </mesh>
    </>
  );
};

export default Ocean;
