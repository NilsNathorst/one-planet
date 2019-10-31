import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useEffect } from "react";
import { setFromSpherical } from "../../helpers/numberGenerators";
import { a } from "react-spring/three";
import * as THREE from "three";

const Cloud = ({ pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/cloud/newcloud.gltf");
  const ref = useRef();

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
    console.log(ref.current);
  }, []);

  return (
    <a.mesh ref={ref} castShadow position={pos} scale={[0.2, 0.2, 0.2]}>
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshNormalMaterial
        attach="material"
        // opacity={0.85}
        transparent
      ></meshNormalMaterial>
    </a.mesh>
  );
};
const Clouds = () => {
  return (
    <>
      {[...Array(10)].map(item => {
        return <Cloud pos={setFromSpherical(103)} />;
      })}
    </>
  );
};
export default Clouds;
