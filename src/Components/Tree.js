import React, { useRef, useEffect, useState } from "react";

import * as CANNON from "cannon";
import { useCannon, Provider } from "../helpers/useCannon";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useRender } from "react-three-fiber";

const Tree = ({ position, variant }) => {
  const [model, setModel] = useState(null);
  const trunkRef = useRef();
  const leavesRef = useRef();
  useEffect(() => {
    new GLTFLoader().load("/models/trees/trees.gltf", gltf => {
      setModel(
        gltf.scene.children.filter(selected => selected.name === variant)[0]
      );
    });
  }, []);
  useRender(() => {
    if (model) {
      trunkRef.current.lookAt(0, 0, 0);
      leavesRef.current.lookAt(0, 0, 0);
    }
  });
  useEffect(() => {
    if (model) {
      trunkRef.current.scale.set(0.1, 0.1, 0.1);
      trunkRef.current.geometry.rotateX(-Math.PI / 2);
      leavesRef.current.scale.set(0.1, 0.1, 0.1);
      leavesRef.current.geometry.rotateX(-Math.PI / 2);
    }

    //   treeRef.current.geometry.rotateX(-Math.PI / 2);
  }, [model]);

  return (
    model && (
      <group position={[...position]}>
        <mesh ref={trunkRef}>
          <bufferGeometry attach="geometry" {...model.children[1].geometry} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh ref={leavesRef}>
          <bufferGeometry attach="geometry" {...model.children[0].geometry} />
          <meshStandardMaterial attach="material" color="green" />
        </mesh>
      </group>
    )
  );
};

export default Tree;
