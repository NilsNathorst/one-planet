import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useState } from "react";

const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();

  return (
    <>
      <mesh recieveShadow ref={ref} scale={[29, 29, 29]} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshBasicMaterial attach="material" color="#158BC6" />
      </mesh>
    </>
  );
};

export default Ocean;
