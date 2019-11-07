import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useEffect, Suspense } from "react";
import { setFromSpherical } from "../../helpers/numberGenerators";
import { a } from "react-spring/three";

const Cloud = ({ pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/cloud/cloudcube.gltf");
  const ref = useRef();
  const grpRef = useRef();
  let xR = Math.random() * 0.0003;
  let yR = Math.random() * 0.0003;
  let zR = Math.random() * 0.0003;
  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);
  useFrame(() => {
    grpRef.current.rotation.x += xR;
    grpRef.current.rotation.z += zR;
    grpRef.current.rotation.y += yR;
  });
  const randomFloat = Math.random() * 0.4 + 0.1;
  return (
    <a.group ref={grpRef}>
      <a.mesh
        position={pos}
        ref={ref}
        castShadow
        scale={[randomFloat, randomFloat, randomFloat]}
      >
        <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
        <meshBasicMaterial
          attach="material"
          opacity={0.45}
          transparent
        ></meshBasicMaterial>
      </a.mesh>
    </a.group>
  );
};
const Clouds = () => {
  return (
    <>
      <Suspense fallback={null}>
        {[...Array(10)].map((item, i) => {
          return (
            <Cloud
              pos={setFromSpherical(Math.floor(Math.random() * 15 + 105))}
              key={i}
            />
          );
        })}
      </Suspense>
    </>
  );
};
export default Clouds;
