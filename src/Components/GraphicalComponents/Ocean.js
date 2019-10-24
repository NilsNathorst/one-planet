import React, { useEffect, useState, useRef, Suspense } from "react";
import { useThree } from "react-three-fiber";
import * as THREE from "three";
import SodaCans from "./SodaCan";

function computeVectors(pos, v, arr, matrix) {
  for (let i = 0; i < pos.count; i += 100) {
    v.fromBufferAttribute(pos, i);
    v.applyMatrix4(matrix);
    let x = Math.trunc(v.x * 100) / 100;
    let y = Math.trunc(v.y * 100) / 100;
    let z = Math.trunc(v.z * 100) / 100;
    arr.push([x, y, z]);
  }
}
function filterfunc(a, key) {
  let seen = new Set();
  return a.filter(item => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
const Ocean = ({ meshRef, geometry }) => {
  const sodacanRef = useRef();
  const [vectorsArray, setVectorsArray] = useState([]);

  useEffect(() => {
    const position = meshRef.current.geometry.attributes.position;
    const vector = new THREE.Vector3();
    const vectorArr = [];
    computeVectors(position, vector, vectorArr, meshRef.current.matrixWorld);
    setVectorsArray(filterfunc(vectorArr, JSON.stringify));
  }, []);

  return (
    <>
      <mesh ref={meshRef} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshLambertMaterial attach="material" color="#158BC6" />
      </mesh>

      <Suspense fallback={null}>
        <SodaCans matrix={vectorsArray} />
      </Suspense>
    </>
  );
};

export default Ocean;
