import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React from "react";

const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");

  return (
    <mesh
      receiveShadow
      onPointerOver={e => {
        //I want to change colors of vectors that i hover!
        //console.log(e.point)
      }}
      onPointerDown={e => {
        e.stopPropagation();

        if (e.point.length() > 80) {
          console.log(e.point);
          //here we will plant some trees in the future
        }
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
