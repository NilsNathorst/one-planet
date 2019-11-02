import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  const ref = useRef();
  return (
    <>
      <mesh
        ref={ref}
        name="Ocean"
        scale={[29.2, 29.2, 29.2]}
        position={[0, 0, 0]}
      >
        <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
        <meshStandardMaterial
          transparent
          attach="material"
          blending={THREE.CustomBlending}
          blendDst={THREE.SrcColorFactor}
          color={0x2191fb}
          roughness={0}
        ></meshStandardMaterial>
      </mesh>
    </>
  );
};

export default Ocean;
