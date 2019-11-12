import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSpring, a } from "react-spring/three";
const Ocean = ({ cans, isDead }) => {
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");
  const [currentColor, setColor] = useState("blue");

  useEffect(() => {
    if (cans.length >= 12) setColor("#56A3A6");
    if (cans.length >= 13) setColor("#879F98");
    if (cans.length >= 14) setColor("#8E877D");
    if (cans.length >= 15) setColor("#6B5552");
    else if (cans.length < 10) {
      setColor("#2191FB");
    }
  }, [cans]);

  const { color } = useSpring({
    color: currentColor,
    config: { duration: 1000 }
  });

  const ref = useRef();
  return (
    <>
      <a.mesh ref={ref} name="Ocean" scale={[30, 30, 30]} position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
        <a.meshStandardMaterial
          transparent
          attach="material"
          opacity={0.8}
          color={isDead ? "#6B5552" : color}
          roughness={0}
        ></a.meshStandardMaterial>
      </a.mesh>
    </>
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
