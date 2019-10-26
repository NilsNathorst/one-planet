import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useEffect, useRef, useState, useContext } from "react";
import { ToolContext } from "../Tools/ToolContext";
import oceanVectors from "../../database/oceanVectors.json";
import { useSpring, a, config } from "react-spring/three";

const SodaCan = ({ pos, magnetActive }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const [mousePos, setMousePos] = useState();
  const gltf = useLoader(GLTFLoader, "/models/sodacan/untitled.gltf");
  const ref = useRef();
  useFrame(() => {
    ref.current.position.setLength(42);
    ref.current.lookAt(0, 0, 0);
  });
  const { position, scale, ...props } = useSpring({
    scale: hovered ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1],
    position: active ? [mousePos.x, mousePos.y, mousePos.z] : pos,
    config: config.wobbly
  });

  return (
    <a.mesh
      name="can"
      onPointerMove={e => {
        if (magnetActive) setMousePos(e.point);
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
      scale={scale}
      ref={ref}
      position={position}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" metalness={0.8} roughness={0.5} />
    </a.mesh>
  );
};

const SodaCans = ({ magnetActive }) => {
  return oceanVectors.map((point, i) => {
    if (i % 10 === 0) {
      return (
        <>
          <SodaCan magnetActive={magnetActive} pos={point} />
        </>
      );
    }
  });
};

export default SodaCans;
