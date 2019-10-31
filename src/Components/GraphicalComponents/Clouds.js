import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useEffect } from "react";
import { setFromSpherical } from "../../helpers/numberGenerators";
import { a } from "react-spring/three";
import * as THREE from "three";

const Cloud = ({ pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/cloud/cloud2.gltf");
  const ref = useRef();
  useFrame(() => {
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <a.mesh ref={ref} position={pos} scale={[0.2, 0.2, 0.2]}>
      <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
      <meshLambertMaterial
        attach="material"
        opacity={0.85}
        transparent
      ></meshLambertMaterial>
    </a.mesh>
  );
};
const Clouds = () => {
  return (
    <>
      {[...Array(10)].map(item => {
        return <Cloud pos={setFromSpherical(100)} />;
      })}
    </>
  );
};
export default Clouds;
