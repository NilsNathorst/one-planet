import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender, useThree } from "react-three-fiber";

import * as THREE from "three";
import SodaCan from "./SodaCan";
const Ocean = ({ meshRef, geometry }) => {
  const attrRef = useRef();
  const sodacanRef = useRef();
  const [vectorsArray, setVectorsArray] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const filterfunc = (a, key) => {
    let seen = new Set();
    return a.filter(item => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  };

  useEffect(() => {
    const position = meshRef.current.geometry.attributes.position;
    const vector = new THREE.Vector3();
    const vectorArr = [];

    for (let i = 0, length = position.length; i < length; i += 100) {
      vector.fromBufferAttribute(position, i);
      vector.applyMatrix4(meshRef.current.matrixWorld);
      let x = Math.trunc(vector.x * 100) / 100;
      let y = Math.trunc(vector.y * 100) / 100;
      let z = Math.trunc(vector.z * 100) / 100;
      vectorArr.push([x, y, z]);
    }
    setVectorsArray(filterfunc(vectorArr, JSON.stringify));
  }, []);

  return (
    <>
      <mesh ref={meshRef} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshLambertMaterial attach="material" color="#158BC6" />
      </mesh>

      {vectorsArray.map((vector, i) => {
        return (
          <SodaCan
            key={i}
            meshRef={sodacanRef}
            inheritPosition={vectorsArray[i]}
          />
        );
      })}
    </>
  );
};

export default Ocean;
