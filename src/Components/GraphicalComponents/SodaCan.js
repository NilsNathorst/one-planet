import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { fetchCans, destroyCan } from "../../actions";
import oceanVectors from "../../database/oceanVectors.json";
import { useTrail, useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";

const SodaCan = ({ destroyCan, firebaseId, scl, magnetActive, pos }) => {
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
      firebaseId={firebaseId}
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
          console.log(e.eventObject.firebaseId);
          destroyCan(firebaseId);
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

const SodaCans = ({ destroyCan, name, cans, fetchCans }) => {
  useEffect(() => {
    fetchCans();
  }, [fetchCans]);

  const trail = useTrail(Object.keys(cans).length, {
    scale: [0.1, 0.1, 0.1],
    from: { scale: [0.01, 0.01, 0.01] },
    config: { mass: 5, tension: 4000, friction: 200 }
  });

  const indexes = useMemo(() => {
    let arr = [];
    for (let i = 0; i < Object.keys(cans).length; i++) {
      arr.push(Math.floor(Math.random() * oceanVectors.length));
    }
    return arr;
  }, [cans]);

  return trail.map(({ scale, ...rest }, i) => {
    return (
      <Suspense fallback={null}>
        <SodaCan
          pos={oceanVectors[indexes[i]]}
          scl={scale}
          magnetActive={name === "MAGNET" ? true : false}
          key={i}
          firebaseId={Object.keys(cans)[i]}
          destroyCan={destroyCan}
        />
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
