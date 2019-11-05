import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { fetchCans, destroyCan, flushCansDatabase } from "../../actions";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";

const SodaCan = ({ destroyCan, firebaseId, magnetActive, pos, url, color }) => {
  const gltf = useLoader(GLTFLoader, url);
  const ref = useRef();
  useFrame(() => {
    if (ref.current.position.length() >= 77) {
      ref.current.position.setLength(77);
    }
    ref.current.lookAt(0, 0, 0);
  });
  const [hovered, set] = useState(false);
  const hover = e => e.stopPropagation() && set(true);
  const unhover = () => set(false);
  const handleClick = (id, event) => {
    event.eventObject.parent != null &&
      event.eventObject.parent.remove(event.eventObject) &&
      destroyCan(id);
  };
  const { scale } = useSpring({
    scale: hovered ? 0.25 : 0.2,
    config: config.wobbly
  });
  const [animatedPos, setAnimatedPos] = useSpring(() => {
    return { position: pos };
  });
  return (
    <a.mesh
      onPointerOver={hover}
      onPointerOut={unhover}
      onPointerDown={e =>
        magnetActive && handleClick(e.eventObject.firebaseId, e)
      }
      onPointerMove={e =>
        magnetActive &&
        hover &&
        setAnimatedPos({ position: [e.point.x, e.point.y, e.point.z] })
      }
      scale={scale.interpolate(s => [s, s, 0.2])}
      firebaseId={firebaseId}
      castShadow
      name="can"
      ref={ref}
      position={animatedPos.position}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
};

const SodaCans = ({ flushCansDatabase, destroyCan, name, cans, fetchCans }) => {
  useEffect(() => {
    flushCansDatabase();
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

const mapStateToProps = ({ state }) => {
  return {
    name: state.name,
    cans: state.cans
  };
};

export default connect(
  mapStateToProps,
  { flushCansDatabase, fetchCans, destroyCan }
)(SodaCans);
