import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useEffect, useState } from "react";

const Grass = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[30.1, 30.1, 30.1]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export default Grass;
