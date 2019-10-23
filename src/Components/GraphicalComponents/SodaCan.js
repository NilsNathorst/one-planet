import React, { useEffect, useState, useContext } from "react";
import { CanvasContext } from "../Context";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { randomV3Radians } from "../../helpers/numberGenerators";
const WaterBottle = ({ meshRef, inheritPosition }) => {
  const [model, setModel] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const { randomRadians } = useContext(CanvasContext);

  useEffect(() => {
    new GLTFLoader().load("/models/sodacan/sodacan.gltf", setModel);
  }, []);

  useEffect(() => {
    model && setLoaded(true);
  }, [model]);
  
  return (
    <>
      {model && isLoaded && (
        <mesh
          ref={meshRef}
          scale={[0.001, 0.001, 0.001]}
          position={inheritPosition}
          rotation={randomRadians}
        >
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[0].geometry}
          />
          <meshStandardMaterial
            attach="material"
            roughness={0.5}
            metalness={0.8}
            emissive={0x000000}
            color={0xffffff}
          />
        </mesh>
      )}
    </>
  );
};

export default WaterBottle;
