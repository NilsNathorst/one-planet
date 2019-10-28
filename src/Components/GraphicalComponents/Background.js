import React, { useRef, useMemo } from "react";

import * as THREE from "three";

const Background = () => {
  const matRef = useRef();
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load("/assets/starmap-milkyway.jpg");
  }, []);
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
