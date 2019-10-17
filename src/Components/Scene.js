import Globe from "./Globe";
import React, { useEffect, useRef } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import * as THREE from "three";
extend({ OrbitControls });
const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      enableDamping
      autoRotate
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
const Plane = () => {
  return (
    <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
};
const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <fog attach={"fog"} args={["white", 5, 10]} />
      <ambientLight />
      <spotLight castShadow position={[0, 5, 10]} penumbra={1} />
      <Globe />
      <Plane />
      <Controls />
    </Canvas>
  );
};

export default Scene;
