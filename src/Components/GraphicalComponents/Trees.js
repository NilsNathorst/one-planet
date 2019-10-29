import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { fetchTrees } from "../../actions";
const Tree = ({ variant, pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const ref = useRef();
  const trunkRef = useRef();
  const [animated, setAnimated] = useState(false);
  const { scale, ...props } = useSpring({
    scale: animated ? [2, 2, 2] : [1, 1, 1],
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <a.group
      position={pos}
      ref={ref}
      scale={scale}
      onPointerDown={() => {
        setAnimated(!animated);
        console.log(animated);
      }}
    >
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

const Trees = props => {
  const { data } = props;
  useEffect(() => {
    props.fetchTrees();
    console.log("fetched");
  }, []);
  return (
    <>
      {data &&
        Object.keys(data).map(item => {
          return (
            <Tree
              pos={[data[item].x, data[item].y, data[item].z]}
              variant={2}
            />
          );
        })}
    </>
  );
};
const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(
  mapStateToProps,
  { fetchTrees }
)(Trees);
