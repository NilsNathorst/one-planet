import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRender } from "react-three-fiber";

const Tree = ({ position, variant }) => {
  const [model, setModel] = useState(null);
  const trunkRef = useRef();
  const groupRef = useRef();
  const leavesRef = useRef();
  useEffect(() => {
    new GLTFLoader().load("/models/trees/trees.gltf", gltf => {
      setModel(
        gltf.scene.children.filter(selected => selected.name === variant)[0]
      );
    });
  }, [variant]);
  useRender(() => {
    if (model) {
      groupRef.current.position.setLength(1.61);
      trunkRef.current.lookAt(0, 0, 0);
      leavesRef.current.lookAt(0, 0, 0);
    }
  });
  useEffect(() => {
    if (model) {
      const rotationOffset = Math.random() * 3;
      const size = Math.random() * 0.005 + 0.006;
      trunkRef.current.scale.set(size, size, size);
      leavesRef.current.scale.set(size, size, size);
      trunkRef.current.geometry.rotateX(-Math.PI / 2);
      leavesRef.current.geometry.rotateX(-Math.PI / 2);
      trunkRef.current.geometry.rotateZ(rotationOffset);
      trunkRef.current.geometry.rotateZ(rotationOffset);
      leavesRef.current.geometry.rotateZ(rotationOffset);
      leavesRef.current.geometry.rotateZ(rotationOffset);
    }

    //   treeRef.current.geometry.rotateX(-Math.PI / 2);
  }, [model]);

  return (
    model && (
      <group position={[...position]} ref={groupRef}>
        <mesh ref={trunkRef} castShadow>
          <bufferGeometry attach="geometry" {...model.children[1].geometry} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh ref={leavesRef} castShadow>
          <bufferGeometry attach="geometry" {...model.children[0].geometry} />
          <meshStandardMaterial attach="material" color="green" />
        </mesh>
      </group>
    )
  );
};

export default Tree;
