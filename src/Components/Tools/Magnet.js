import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import { Canvas, useThree, useRender } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import { useSpring, a } from "react-spring/three";
var vec = new THREE.Vector3(); // create once and reuse
var pos = new THREE.Vector3(); // create once and reuse
const Magnet = ({ meshRef, inheritPosition }) => {
  useRender(() => {
    meshRef.current.position.setLength(1.6);
  });
  return (
    <a.mesh scale={[0.1, 0.1, 0.1]} ref={meshRef} position={inheritPosition}>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  );
};

export default Magnet;
