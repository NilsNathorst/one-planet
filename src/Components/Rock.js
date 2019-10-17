import React, { useRef } from "react";
import { useRender } from "react-three-fiber";
import * as THREE from "three";
import * as CANNON from "cannon";
import { useCannon, Provider } from "../custom-hooks/useCannon";

const Rock = ({ position }) => {
  // Register Rock as a physics body with zero mass
  const rockRef = useCannon({ mass: 30 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
    console.log(body.force);
    body.preStep = () => {
      var distanceBetween = new CANNON.Vec3();
      body.position.negate(distanceBetween);
      var distance = distanceBetween.norm();
      distanceBetween.normalize();
      distanceBetween.mult(3000 / Math.pow(distance, 2), body.force);
    };
  });

  useRender(() => {
    // rockRef.current.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={rockRef} visible castShadow>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial wireframe attach="material" color="hotpink" />
    </mesh>
  );
};

export default Rock;
