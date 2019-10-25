import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import * as THREE from "three";

const Background = () => {
  const [myState, setmyState] = useState(null);
  const matRef = useRef();
  useEffect(() => {
    console.log(matRef.current);
  }, []);
  const texture = useMemo(() =>
    new THREE.TextureLoader().load("/assets/starmap-milkyway.jpg")
  );
  return (
    <>
      <fog attach="fog" args={[0x87cefa, 350, 800]} />

      <mesh>
        <sphereBufferGeometry attach="geometry" args={[300, 40, 40]} />
        <meshBasicMaterial side={1} ref={matRef} attach="material">
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      </mesh>
    </>
  );
};

export default Background;
