import React from "react";
import { useRender } from "react-three-fiber";
import * as CANNON from "cannon";
import { useCannon } from "../helpers/useCannon";

const Rock = ({ position }) => {
  // Register Rock as a physics body with zero mass
  const rockRef = useCannon({ mass: 100 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(0.3, 0.3, 0.3)));
    body.position.set(...position);
    body.preStep = () => {
      var distanceBetween = new CANNON.Vec3();
      body.position.negate(distanceBetween);
      var distance = distanceBetween.norm();
      distanceBetween.normalize();
      distanceBetween.mult(1500 / Math.pow(distance, 1), body.force);
      if (distance <= 4.1) {
        body.mass = 0;
      }
    };
  });

  useRender(() => {
    rockRef.current.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={rockRef} visible castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[0.1, 0]} />
      <meshStandardMaterial attach="material" color="brown" />
    </mesh>
  );
};

export default Rock;
