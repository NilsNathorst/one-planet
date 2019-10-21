import Planet from "./Planet";
import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import * as THREE from "three";
import { CanvasContext } from "./Context";
import { Provider } from "../helpers/useCannon";
import Rock from "./Rock";
import Sun from "./Sun";
import Tree from "./Tree";
import BirdScene from "./BirdScene";
import TreeTool from "./TreeTool";
import { database } from "../database/firebase.js";
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
  const [treeTool, toggleTreeTool] = useState(false);
  const [treeVectors, setTreeVectors] = useState([]);
  return (
    <>
      <TreeTool
        isActive={treeTool}
        onClick={() => {
          toggleTreeTool(!treeTool);
        }}
      />
      <Canvas
        camera={{ position: [0, 10, -25] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <CanvasContext.Provider
          value={{ treeTool, treeVectors, setTreeVectors }}
        >
          <Provider>
            {/* <fog attach={"fog"} args={["white", 5, 11]} /> */}
            <ambientLight />
            <hemisphereLight intensity={0} />
            {treeVectors.map((tree, i) => {
              return (
                <Tree
                  position={[tree.x, tree.y, tree.z]}
                  variant="roseTree"
                  key={i}
                />
              );
            })}

            <Planet position={[0, 0, 0]} />

            <Sun />
            <Controls />
            <BirdScene />
          </Provider>
        </CanvasContext.Provider>
      </Canvas>
    </>
  );
};

export default Scene;
