import Planet from "./Planet";
import React, { useRef, Suspense } from "react";
import Rock from "./Rock";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import * as THREE from "three";

import { Provider } from "../helpers/useCannon";
import Tree from "./Tree";

extend({ OrbitControls });
extend({ TrackballControls });
const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return (
    <trackballControls
      enableDamping
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, -10] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <Provider>
        {/* <fog attach={"fog"} args={["white", 5, 10]} /> */}
        <ambientLight />
        <spotLight castShadow position={[0, 5, 10]} penumbra={1} />
        <Planet position={[0, 0, 0]} />
        <Tree position={[-1.2, -1, -1]} />
        <Tree position={[1.2, 1, 1]} />
        <Tree position={[1.2, -1, -1]} />
        <Controls />
      </Provider>
    </Canvas>
  );
};

export default Scene;
