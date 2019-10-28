import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React from "react";

const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");

  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        e.stopPropagation();
      }}
      scale={[29.3, 29.3, 29.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};

export default Dirt;
