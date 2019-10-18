import React, { useRef, useEffect } from "react";
import { useRender } from "react-three-fiber";
import * as CANNON from "cannon";
import { useCannon } from "../helpers/useCannon";

const Tree = ({ position }) => {
  // Register tree as a physics body with zero mass
  const groupRef = useRef();
  const trunkRef = useRef();
  const treeRef = useCannon({ mass: 0 }, body => {
    var shape = new CANNON.Cylinder(0.5, 0.5, 2, 20);
    body.addShape(shape, 0, 0);
    body.position.set(...position);
  });

  useEffect(() => {
    treeRef.current.geometry.rotateX(-Math.PI / 2);
    trunkRef.current.geometry.rotateX(-Math.PI / 2);
  }, []);
  console.log(position);
  useRender(() => {
    treeRef.current.lookAt(0, 0, 0);
    trunkRef.current.lookAt(0, 0, 0);
  });
  const offset = 0.5;
  return (
    <group ref={groupRef}>
      <mesh ref={treeRef} visible castShadow>
        <coneBufferGeometry attach="geometry" args={[0.3, 1, 40]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
      <mesh
        ref={trunkRef}
        position={[position[0] / 1.2, position[1] / 1.2, position[2] / 1.2]}
      >
        <cylinderBufferGeometry attach="geometry" args={[0.1, 0.1, 0.8, 20]} />
        <meshStandardMaterial attach="material" color="brown" />
      </mesh>
    </group>
  );
};

export default Tree;
