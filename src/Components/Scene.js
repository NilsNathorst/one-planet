import Planet from "./Planet";
import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { CanvasContext } from "./Context";
import Sun from "./Sun";
import Tree from "./GraphicalComponents/Trees";
import BirdScene from "./BirdScene";
import { randomV3Radians } from "../helpers/numberGenerators";
import TreeTool from "./TreeTool";
extend({ OrbitControls });

const SpawnTree = (variant, index, position) => (
  <Tree position={[...position]} variant={variant} key={index} />
);

const random = randomV3Radians();
const Scene = () => {
  const [treeTool, toggleTreeTool] = useState(false);
  const [treeVectors, setTreeVectors] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [randomRadians] = useState(random);
  return (
    <>
      <TreeTool
        isActive={treeTool}
        onClick={() => {
          toggleTreeTool(!treeTool);
        }}
      />
      <button onClick={() => setDisabled(!isDisabled)}>Disable Controls</button>
      <Canvas
        camera={{ position: [0, 10, -25] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <CanvasContext.Provider
          value={{ treeTool, treeVectors, setTreeVectors, randomRadians }}
        >
          <ambientLight args={[0x404040]} />
          <BirdScene />
          <Planet position={[0, 0, 0]}>
            {treeVectors.map((tree, i) =>
              SpawnTree("roseTree", i, [tree.x, tree.y, tree.z])
            )}
          </Planet>
          <Sun />
          <Controls disabled={isDisabled} />
        </CanvasContext.Provider>
      </Canvas>
    </>
  );
};

export default Scene;
