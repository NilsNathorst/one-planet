import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React from "react";

const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");

  return (
    <mesh scale={[30, 30, 30]} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
      <meshStandardMaterial attach="material" color="brown" />
    </mesh>
  );
};

export default Dirt;
