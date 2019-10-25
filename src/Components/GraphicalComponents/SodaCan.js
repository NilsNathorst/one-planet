import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef } from "react";
import oceanVectors from "../../database/oceanVectors.json";
import { useThree } from "react-three-fiber";
const SodaCan = ({ pos }) => {
  const { intersect } = useThree();
  const gltf = useLoader(GLTFLoader, "/models/sodacan/can.gltf");
  const ref = useRef();
  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);

  return (
    <mesh
      name="can"
      onPointerDown={e => {
        e.stopPropagation();

        console.log(e.distance);
        console.log(e.eventObject.parent.__objects[0].object.position);

        e.eventObject.material.color.r = 255;
        e.eventObject.material.color.g = 0;
        e.eventObject.material.color.b = 0;
      }}
      scale={[0.1, 0.1, 0.1]}
      ref={ref}
      position={pos}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

const SodaCans = () => {
  return oceanVectors.map((point, i) => {
    return (
      <>
        <SodaCan key={i} pos={point} />
      </>
    );
  });
};

export default SodaCans;
