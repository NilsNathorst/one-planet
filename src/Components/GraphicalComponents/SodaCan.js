import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { fetchCans, destroyCan } from "../../actions";

import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";

const SodaCan = ({ destroyCan, firebaseId, magnetActive, pos, url, color }) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState(0);

  const gltf = useLoader(GLTFLoader, url);
  const ref = useRef();
  useFrame(() => {
    if (ref.current.position.length() >= 77) {
      ref.current.position.setLength(77);
    }
    ref.current.lookAt(0, 0, 0);
  });
  const { position, scale, ...props } = useSpring({
    scale: hovering ? [0.5, 0.5, 0.5] : [0.3, 0.3, 0.3],
    position: active && hovering ? [mousePos.x, mousePos.y, mousePos.z] : pos,
    config: config.slow
  });

  return (
    <a.mesh
      firebaseId={firebaseId}
      castShadow
      name="can"
      onPointerMove={e => {
        if (magnetActive) {
          setMousePos(e.point);
        }
      }}
      onPointerDown={e => {
        e.stopPropagation();
        if (magnetActive && e.eventObject.parent != null) {
          console.log(e.eventObject);
        }
      }}
      onPointerOver={e => {
        e.stopPropagation();
        if (magnetActive) {
          setHovering(true);
          setActive(true);
        }
      }}
      onPointerOut={e => {
        setHovering(false);
        setActive(false);
      }}
      scale={scale}
      ref={ref}
      position={position}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
};

const SodaCans = ({ destroyCan, name, cans, fetchCans }) => {
  useEffect(() => {
    fetchCans();
  }, [fetchCans]);

  return Object.values(cans).map(can => {
    return (
      <Suspense fallback={null}>
        {can.id && can.pos && (
          <SodaCan
            pos={can.pos}
            magnetActive={name === "MAGNET" ? true : false}
            firebaseId={can.id}
            destroyCan={destroyCan}
            color={can.color}
            url={"/models/sodacan/untitled.gltf"}
          />
        )}
      </Suspense>
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
  { fetchCans, destroyCan }
)(SodaCans);
