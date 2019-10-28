import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useEffect, useRef, useState, useContext } from "react";
import { ToolContext } from "../Tools/ToolContext";
import oceanVectors from "../../database/oceanVectors.json";
import { useTrail, useSpring, a, config } from "react-spring/three";

const SodaCan = ({ scl, pos, magnetActive }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const [mousePos, setMousePos] = useState();
  const gltf = useLoader(GLTFLoader, "/models/sodacan/untitled.gltf");
  const ref = useRef();
  useFrame(() => {
    if (ref.current.position.length() >= 77) {
      ref.current.position.setLength(77);
    }
    ref.current.lookAt(0, 0, 0);
  });
  const { position, scale, color, ...props } = useSpring({
    scale: hovered ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1],
    position: active ? [mousePos.x, mousePos.y, mousePos.z] : pos,
    config: config.wobbly
  });

  return (
    <a.mesh
      castShadow
      name="can"
      onPointerMove={e => {
        if (magnetActive) {
          setMousePos(e.point);
        }
      }}
      onPointerDown={e => {
        if (magnetActive && e.eventObject.parent != null) {
          e.eventObject.parent.remove(e.eventObject);
        }
      }}
      onPointerOver={e => {
        if (magnetActive) {
          setHovered(true);
          setActive(true);
        }
      }}
      onPointerOut={e => {
        setHovered(false);
      }}
      scale={scl}
      ref={ref}
      position={position}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial
        attach="material"
        metalness={1}
        emissive={0x101010}
        color={0x87cefa}
      />
    </a.mesh>
  );
};

const SodaCans = ({ magnetActive }) => {
  const trail = useTrail(oceanVectors.length, {
    scale: [0.1, 0.1, 0.1],
    from: { scale: [0.01, 0.01, 0.01] },
    config: { mass: 5, tension: 4000, friction: 200 }
  });

  return trail.map(({ scale, ...rest }, i) => {
    if (i % 10 === 0) {
      return (
        <>
          <SodaCan
            scl={scale}
            magnetActive={magnetActive}
            pos={oceanVectors[i]}
          />
        </>
      );
    }
  });
};

export default SodaCans;
