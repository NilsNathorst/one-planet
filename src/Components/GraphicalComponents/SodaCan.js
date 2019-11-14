import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect, Suspense } from "react";
import {
  fetchCans,
  destroyCan,
  flushCansDatabase,
  setShowInfo
} from "../../actions";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
const SodaCan = ({
  setShowInfo,
  destroyCan,
  firebaseId,
  magnetActive,
  pos,
  url,
  color,
  infoActive
}) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });
  useFrame(() => {
    if (ref.current.position.length() >= 80) {
      ref.current.position.setLength(80);
    }
    ref.current.lookAt(0, 0, 0);
  });

  const [hovered, set] = useState(false);
  const hover = e => {
    e.stopPropagation() && set(true);
    infoActive &&
      setShowInfo({
        active: true,
        object: e.eventObject
      });
  };
  const unhover = e => {
    set(false);
    infoActive && setShowInfo({ active: false, object: null });
  };
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
      ref={ref}
      position={animatedPos.position}
      onPointerOver={e => hover(e)}
      onPointerOut={e => unhover(e)}
      onPointerDown={e => {
        magnetActive && handleClick(e.eventObject.firebaseId, e);
      }}
      onPointerMove={e =>
        magnetActive &&
        hover &&
        setAnimatedPos({ position: [e.point.x, e.point.y, e.point.z] })
      }
      scale={scale.interpolate(s => [s, s, 0.2])}
      firebaseId={firebaseId}
      castShadow
      name="can"
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
};

const SodaCans = ({
  setShowInfo,
  flushCansDatabase,
  destroyCan,
  name,
  cans,
  fetchCans
}) => {
  useEffect(() => {
    flushCansDatabase();
    fetchCans();
  }, [fetchCans, flushCansDatabase]);

  return (
    cans &&
    Object.values(cans).map((can, i) => {
      return (
        <Suspense fallback={null} key={i}>
          {can.id && can.pos && (
            <SodaCan
              pos={can.pos}
              magnetActive={name === "MAGNET" ? true : false}
              infoActive={name === "QUERY" ? true : false}
              firebaseId={can.id}
              destroyCan={destroyCan}
              setShowInfo={setShowInfo}
              color={can.color}
              url={"/models/sodacan/untitled.gltf"}
            />
          )}
        </Suspense>
      );
    })
  );
};

const mapStateToProps = ({ state: { name, cans } }) => {
  return {
    name,
    cans
  };
};

export default connect(mapStateToProps, {
  flushCansDatabase,
  fetchCans,
  destroyCan,
  setShowInfo
})(SodaCans);
