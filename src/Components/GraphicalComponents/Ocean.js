import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { useSpring, a, config } from "react-spring/three";
import * as THREE from "three";
const Ocean = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/planet-v4.gltf");
  const ref = useRef();
  const [rev, setRev] = useState(false);
  const { scale, ...props } = useSpring({
    scale: [29.5, 29.5, 29.5],
    from: { scale: [28.5, 28.5, 28.5] },
    reset: true,
    onRest: () => {
      setRev(!rev);
    },
    reverse: rev,
    config: { ...config.molasses, duration: 1000 * 30 }
  });
  useEffect(() => {
    console.log(ref);
  }, []);
  return (
    <>
      <a.mesh name="Ocean" scale={scale} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial
          attach="material"
          ref={ref}
          blending={THREE.CustomBlending}
          blendDst={THREE.SrcColorFactor}
          color={0x2191fb}
        ></meshStandardMaterial>
      </a.mesh>
    </>
  );
};

export default Ocean;
