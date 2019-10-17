import React, { useRef } from "react";
import { useRender } from "react-three-fiber";
import * as CANNON from "cannon";
import { useCannon, Provider } from "../custom-hooks/useCannon";

const Globe = ({ position }) => {
  const globeRef = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Sphere(2));
    body.position.set(...position);
  });
  useRender(() => {
    globeRef.current.rotation.x += 0.01;
  });
  return (
    <mesh ref={globeRef} visible castShadow>
      <sphereBufferGeometry attach="geometry" args={[2, 50, 50]} />
      <meshBasicMaterial wireframe attach="material" color={0xffff00} />
    </mesh>
  );
};

export default Globe;
