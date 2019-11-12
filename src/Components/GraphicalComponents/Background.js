import React, { useRef, useMemo } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const Background = () => {
  const matRef = useRef();

  const [starMap, fireMap] = useLoader(TextureLoader, [
    "/assets/starmap-milkyway.jpg",
    "/assets/sun.jpg"
  ]);
  return (
    <>
      <fog attach="fog" args={[0x87cefa, 350, 800]} />
      <mesh name="bg">
        <sphereBufferGeometry attach="geometry" args={[300, 40, 40]} />
        <meshStandardMaterial side={1} ref={matRef} attach="material">
          <primitive attach="map" object={starMap} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

export default Background;
