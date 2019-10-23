import React, { useEffect, useRef } from "react";
import { setFromSpherical } from "../../helpers/numberGenerators";
import * as THREE from "three";
import { a } from "react-spring/three";

const Magnet = () => {
  const magnetRef = useRef();
  const setFromSpherical = () => {
    return new THREE.Vector3().setFromSphericalCoords(
      5,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
  };
  useEffect(() => {
    console.log(magnetRef);
    console.log(setFromSpherical());
  }, []);
  return (
    <a.mesh ref={magnetRef} position={setFromSpherical()}>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  );
};

export default Magnet;
