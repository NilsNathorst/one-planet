import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import WaterBottle from "./WaterBottle";

const Ocean = ({ meshRef, geometry }) => {
  const bottleRef = useRef();
  let [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const bottles = [0, 1, 2, 3, 4, 5, 6];
  const setFromSpherical = () => {
    return new THREE.Vector3().setFromSphericalCoords(
      1.5,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
  };
  useEffect(() => {
    console.log(meshRef.current.geometry);
  }, []);

  return (
    <>
      <mesh ref={meshRef} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry}></bufferGeometry>
        <meshLambertMaterial attach="material" color="#158BC6" />
      </mesh>
      {bottles.map((bottle, i) => {
        return (
          <WaterBottle
            key={i}
            meshRef={bottleRef}
            inheritPosition={setFromSpherical()}
          />
        );
      })}
    </>
  );
};

export default Ocean;
