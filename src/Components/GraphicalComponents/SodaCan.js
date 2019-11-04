import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useSpring, a, config } from "react-spring/three";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

const SodaCan = props => {
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
    position: active ? [mousePos.x, mousePos.y, mousePos.z] : props.pos,
    config: config.wobbly
  });

  return (
    <a.mesh
      firebaseId={props.firebaseId}
      castShadow
      name="can"
      onPointerMove={e => {
        if (props.magnetActive) {
          setMousePos(e.point);
        }
      }}
      onPointerDown={e => {
        if (props.magnetActive && e.eventObject.parent != null) {
          e.eventObject.parent.remove(e.eventObject);
          props.destroyCan(props.firebaseId);
        }
      }}
      onPointerOver={e => {
        if (props.magnetActive) {
          setActive(true);
        }
      }}
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

const SodaCans = props => {
  useEffect(() => {
    props.actions.fetchCans();
  }, []);

  return (
    props.state.cans &&
    Object.values(props.state.cans).map((can, i) => {
      return (
        <Suspense fallback={null}>
          <SodaCan
            pos={can.pos}
            magnetActive={props.state.name === "MAGNET" ? true : false}
            key={i}
            firebaseId={can.id}
            destroyCan={props.actions.destroyCan}
          />
        </Suspense>
      );
    })
  );
};

const mapStateToProps = ({ state }) => {
  return {
    state
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SodaCans);
