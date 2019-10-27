import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useMemo, useEffect, useState } from "react";

import * as THREE from "three";
const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();

  return (
    <>
      <mesh name="Ocean" scale={[29.2, 29.2, 29.2]} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial
          attach="material"
          ref={ref}
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
