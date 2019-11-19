import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { useSpring, a } from "react-spring/three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
const Ocean = ({ cans, isDead }) => {
  const ref = useRef();
  const [currentColor, setColor] = useState("#2191FB");
  const gltf = useLoader(
    GLTFLoader,
    "/models/planet/final/water.glb",
    loader => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco-gltf/");
      loader.setDRACOLoader(dracoLoader);
    }
  );
  useEffect(() => {
    if (cans.length >= 15) setColor("#56A3A6");
    if (cans.length >= 20) setColor("#879F98");
    if (cans.length >= 25) setColor("#8E877D");
    if (cans.length >= 30) setColor("#6B5552");
    else if (cans.length < 10) {
      setColor("#2191FB");
    }
  }, [cans]);

  const { color } = useSpring({
    color: currentColor,
    config: { duration: 1000 }
  });

  return (
    <Suspense fallback={null}>
      <a.mesh name="Ocean" scale={[12, 12, 12]} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
        <a.meshStandardMaterial
          attach="material"
          transparent
          opacity={0.8}
          color={isDead ? "#6B5552" : color}
          roughness={0}
          side={1}
        />
      </a.mesh>
      <a.mesh ref={ref} name="Ocean" scale={[12, 12, 12]} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <a.meshStandardMaterial
          attach="material"
          transparent
          opacity={0.8}
          side={1}
          color={isDead ? "#6B5552" : color}
          roughness={0}
        />
      </a.mesh>
    </Suspense>
  );
};

const mapStateToProps = ({ state: { cans, isDead } }) => {
  return {
    cans: cans ? Object.values(cans).filter(can => can !== "was removed") : [],
    isDead
  };
};

export default connect(mapStateToProps)(Ocean);
//0x2191fb
