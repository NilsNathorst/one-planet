import React, { useRef, useEffect, useState } from "react";
import { useRender } from "react-three-fiber";
import * as CANNON from "cannon";
import { useCannon, Provider } from "../helpers/useCannon";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";

const Planet = ({ position }) => {
  const [model, setModel] = useState(null);
  const planetRef = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Sphere(4.9));
    body.position.set(...position);
  });
  useEffect(() => {
    new GLTFLoader().load("/models/planet.gltf", setModel);
  }, []);

  useEffect(() => {
    model && planetRef.current.scale.set(4, 4, 4);
  }, [model]);

  return (
    model && (
      <mesh ref={planetRef} position={[0, 0, 0]}>
        <bufferGeometry
          attach="geometry"
          {...model.scene.children[2].geometry}
        />
        <meshStandardMaterial wireframe attach="material" color="brown" />
      </mesh>
    )
  );
};

export default Planet;
