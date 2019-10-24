import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef } from "react";

const SodaCan = ({ pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/sodacan/sodacan.gltf");
  const ref = useRef();

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);
  return (
    <mesh scale={[0.001, 0.001, 0.001]} ref={ref} position={pos}>
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

const SodaCans = ({ matrix }) => {
  return matrix.map((point, i) => {
    return (
      <>
        <SodaCan key={i} pos={point} />
      </>
    );
  });
};

export default SodaCans;
