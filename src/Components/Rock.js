import React, { useRef } from "react";
import { useRender } from "react-three-fiber";
import * as THREE from "three";

const Rock = ({ color, x, y, z }) => {
  const rockRef = useRef();
  console.log(x, y, z);
  useRender(() => {
    rockRef.current.rotation.x += 0.01;
    rockRef.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={rockRef}
      visible
      userData={{ test: "hello" }}
      position={new THREE.Vector3(x, y, z)}
      rotation={new THREE.Euler(0, 0, 0)}
      geometry={new THREE.BoxGeometry(1, 1, 1)}
      material={
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true
        })
      }
    />
  );
};

export default Rock;
