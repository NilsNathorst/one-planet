import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect } from "react";
import { fetchCans } from "../../actions";
import oceanVectors from "../../database/oceanVectors.json";
import { useTrail, useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";

const SodaCan = ({ scl, magnetActive, pos }) => {
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

const SodaCans = ({ name, cans, fetchCans }) => {
  useEffect(() => {
    fetchCans();
  }, [fetchCans]);

  const trail = useTrail(Object.keys(cans).length, {
    scale: [1.1, 1.1, 1.1],
    from: { scale: [0.1, 0.1, 0.1] },
    config: { mass: 5, tension: 4000, friction: 200 }
  });

  return trail.map(({ scale, ...rest }, i) => {
    const randomPos =
      oceanVectors[Math.floor(Math.random() * oceanVectors.length)];
    return (
      <SodaCan
        pos={randomPos}
        scl={scale}
        magnetActive={name === "MAGNET" ? true : false}
      />
    );
  });
};
const mapStateToProps = ({ cans, state }) => {
  return {
    name: state.name,
    cans
  };
};

export default connect(
  mapStateToProps,
  { fetchCans }
)(SodaCans);
