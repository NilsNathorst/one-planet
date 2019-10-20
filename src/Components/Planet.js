import React, { useEffect, useState, useRef } from "react";
import * as CANNON from "cannon";
import { useCannon } from "../helpers/useCannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Planet = ({ position }) => {
  const [model, setModel] = useState(null);
  const surfaceRef = useRef();
  const waterRef = useRef();
  const planetRef = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Sphere(4.9));
    body.position.set(...position);
  });
  useEffect(() => {
    new GLTFLoader().load("/models/planet/planet.gltf", setModel);
  }, []);

  useEffect(() => {
    model && planetRef.current.scale.set(4, 4, 4);
    model && console.log(model.scene.children[0].geometry);
  }, [model]);

  return (
    model && (
      <group ref={planetRef} position={[0, 0, 0]} receiveShadow={true}>
        <mesh ref={surfaceRef}>
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[0].geometry}
          />
          <meshLambertMaterial attach="material" color="#1F5C00" />
        </mesh>
        <mesh ref={waterRef}>
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[1].geometry}
          />
          <meshLambertMaterial attach="material" color="#158BC6" />
        </mesh>
      </group>
    )
  );
};

export default Planet;
