import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef } from "react";
import oceanVectors from "../../database/oceanVectors.json";
import { useThree } from "react-three-fiber";
const SodaCan = ({ pos }) => {
  const { intersect } = useThree();
  const gltf = useLoader(GLTFLoader, "/models/sodacan/untitled.gltf");
  const ref = useRef();
  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);

  return (
    <mesh
      name="can"
      onPointerDown={e => {
        e.stopPropagation();

        e.eventObject.material.color.r = 155;
        e.eventObject.material.color.g = 1;
        e.eventObject.material.color.b = 1;
      }}
      scale={[0.1, 0.1, 0.1]}
      ref={ref}
      position={pos}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" metalness={0.8} roughness={0.5} />
    </mesh>
  );
};

const SodaCans = () => {
  return oceanVectors.map((point, i) => {
    if (i % 10 === 0) {
      return (
        <>
          <SodaCan key={i} pos={point} />
        </>
      );
    }
  });
};

export default SodaCans;
