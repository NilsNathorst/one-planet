import Planet from "./Planet";
import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import * as THREE from "three";

import { Provider } from "../helpers/useCannon";
import Rock from "./Rock";
import Sun from "./Sun";
import Tree from "./Tree";
import BirdScene from "./BirdScene";

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
      camera={{ position: [0, 10, -25] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <Provider>
        {/* <fog attach={"fog"} args={["white", 5, 11]} /> */}
        <ambientLight />
        <hemisphereLight intensity={0} />

        <Planet position={[0, 0, 0]} />
        <Sun />
        <Tree position={[0, 5.2, 0]} variant="roseTree" />
        <Tree position={[1, 3, 0]} variant="roseTree" />
        <Rock position={[0, 10, 0]} />
        <Controls />
        <BirdScene />
      </Provider>
    </Canvas>
  );
};

export default Scene;
