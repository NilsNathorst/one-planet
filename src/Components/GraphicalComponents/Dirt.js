import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";

const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");

  return (
    <mesh receiveShadow scale={[30.3, 30.3, 30.3]} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};

export default Dirt;
