import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useMemo } from "react";

import * as THREE from "three";
const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();

  const texture = useMemo(() =>
    new THREE.TextureLoader().load("/assets/watermap.png")
  );

  return (
    <>
      <mesh
        comuteVertexNormals
        ref={ref}
        name="Ocean"
        scale={[29, 29, 29]}
        position={[0, 0, 0]}
      >
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial attach="material" color="dodgerblue" transparent>
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

export default Ocean;
