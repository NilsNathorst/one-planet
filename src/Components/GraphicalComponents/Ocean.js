import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender, useThree } from "react-three-fiber";

import * as THREE from "three";
import WaterBottle from "./WaterBottle";
const Ocean = ({ meshRef, geometry }) => {
  const bottleRef = useRef();
  const [vectorsArray, setVectorsArray] = useState([]);
  const bottles = new Array(20).fill();
  useEffect(() => {
    const position = meshRef.current.geometry.attributes.position;
    const vector = new THREE.Vector3();
    const vectorArr = [];

    for (let i = 0, length = position.length; i < length; i += 20) {
      vector.fromBufferAttribute(position, i);
      vector.applyMatrix4(meshRef.current.matrixWorld);
      let x = Math.trunc(vector.x * 100) / 100;
      let y = Math.trunc(vector.y * 100) / 100;
      let z = Math.trunc(vector.z * 100) / 100;
      const newVector = new THREE.Vector3(x, y, z);
      vectorArr.push(newVector);
    }

    const filterfunc = (a, key) => {
      var seen = {};
      return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      });
    };
    setVectorsArray([...new Set(filterfunc(vectorArr, JSON.stringify))]);
  }, []);

  return (
    <>
      <mesh ref={meshRef} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshLambertMaterial attach="material" color="#158BC6" />
      </mesh>
      {bottles.map((bottle, i) => {
        return (
          <WaterBottle
            key={i}
            meshRef={bottleRef}
            inheritPosition={
              vectorsArray[Math.floor(Math.random() * vectorsArray.length)]
            }
          />
        );
      })}
    </>
  );
};

export default Ocean;
