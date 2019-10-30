import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { fetchTrees } from "../../actions";
import * as THREE from "three";
import Grass from "./Grass";
const Tree = ({ variant, pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const ref = useRef();
  const trunkRef = useRef();
  const { scale, ...props } = useSpring({
    scale: [0.5, 0.5, 0.5],
    from: { scale: [0.1, 0.1, 0.1] },
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <a.group position={pos} ref={ref} scale={scale}>
      <mesh>
        <bufferGeometry
          name="leaves"
          attach="geometry"
          {...gltf.__$[variant].geometry}
        />
        <meshStandardMaterial attach="material" color="forestgreen" />
      </mesh>
      <mesh ref={trunkRef}>
        <bufferGeometry
          name="trunk"
          attach="geometry"
          {...gltf.__$[variant + 4].geometry}
        />
        <meshStandardMaterial attach="material" color="saddlebrown" />
      </mesh>
    </a.group>
  );
};

const Trees = ({ data, fetchTrees }) => {
  useEffect(() => {
    fetchTrees();
  }, []);
  return (
    <>
      <Grass />
      {data &&
        data.map((item, i) => {
          return <Tree pos={[item.x, item.y, item.z]} variant={2} key={i} />;
        })}
    </>
  );
};
const mapStateToProps = ({ data }) => {
  return {
    data: Object.values(data)
  };
};

export default connect(
  mapStateToProps,
  { fetchTrees }
)(Trees);
