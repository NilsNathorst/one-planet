import Globe from "./Globe";
import React, { useEffect, useRef } from "react";
import Rock from "./Rock";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import * as THREE from "three";
import * as CANNON from "cannon";
import { useCannon, Provider } from "../custom-hooks/useCannon";

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
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
// const Plane = () => {
//   return (
//     <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <meshPhysicalMaterial attach="material" color="white" />
//     </mesh>
//   );
// };
const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, -15, 0] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <Provider>
        {/* <fog attach={"fog"} args={["white", 5, 10]} /> */}
        <ambientLight />
        <spotLight castShadow position={[0, 5, 10]} penumbra={1} />
        <Globe position={[0, 0, 0]} />
        <Rock position={[2, -2, 10]} />
        {/* <Plane /> */}
        <Controls />
      </Provider>
    </Canvas>
  );
};

export default Scene;
