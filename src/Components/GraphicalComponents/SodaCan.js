import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState } from "react";

import oceanVectors from "../../database/oceanVectors.json";
import { useTrail, useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
const SodaCan = ({ scl, pos, magnetActive, index }) => {
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
  const { position } = useSpring({
    position: active ? [mousePos.x, mousePos.y, mousePos.z] : pos,
    config: config.wobbly
  });

  return (
    <a.mesh
      key={index}
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
          setActive(true);
        }
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

const SodaCans = ({ state }) => {
  const trail = useTrail(oceanVectors.length, {
    scale: [0.1, 0.1, 0.1],
    from: { scale: [0.01, 0.01, 0.01] },
    config: { mass: 5, tension: 4000, friction: 200 }
  });

  return trail.map(({ scale, ...rest }, i) => {
    if (i % 10 === 0) {
      return (
        <SodaCan
          scl={scale}
          magnetActive={state.name === "MAGNET" ? true : false}
          pos={oceanVectors[i]}
          index={i}
          key={i}
        />
      );
    }
  });
};
const mapStateToProps = ({ state }) => {
  return {
    state
  };
};
export default connect(mapStateToProps)(SodaCans);
