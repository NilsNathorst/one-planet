import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { useSpring, a } from "react-spring/three";
import * as THREE from "three";
const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();

  const texture = useMemo(() =>
    new THREE.TextureLoader().load("/assets/watermap.png")
  );

  const { scale } = useSpring({
    scale: [30, 30, 30],
    from: { scale: [25, 25, 25] },
    config: {
      duration: 2000,
      mass: 10,
      tension: 1000,
      friction: 300,
      precision: 0.00001
    }
  });

  return (
    <>
      <a.mesh
        comuteVertexNormals
        ref={ref}
        name="Ocean"
        onPointerDown={e => {
          e.stopPropagation();
        }}
        scale={scale}
        position={[0, 0, 0]}
      >
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial attach="material" color="dodgerblue" transparent>
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      </a.mesh>
    </>
  );
};

export default Ocean;
