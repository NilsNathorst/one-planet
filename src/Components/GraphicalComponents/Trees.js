import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, Suspense } from "react";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { fetchTrees } from "../../actions";

const Tree = ({ variant, pos, age }) => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const ref = useRef();
  const trunkRef = useRef();
  let index = 0;
  const colorsArray = [
    {
      color: "#9EFF00"
    },
    {
      color: "#228B22"
    },
    {
      color: "#CB7500"
    }
  ];

  if (age === "young") index = 1;
  if (age === "adult") index = 2;

  const { color } = useSpring({
    color: colorsArray[index].color,
    from: { color: colorsArray[index - 1].color },
    config: { duration: 6000 }
  });
  const { scale } = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0.01, 0.01, 0.01] },
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <a.group position={pos} ref={ref} scale={scale}>
      <a.mesh>
        <a.bufferGeometry
          name="leaves"
          attach="geometry"
          {...gltf.__$[variant].geometry}
        />
        <a.meshStandardMaterial attach="material" color={color} />
      </a.mesh>
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

const Trees = ({ trees, fetchTrees }) => {
  useEffect(() => {
    fetchTrees();
  }, [fetchTrees]);
  return (
    <Suspense fallback={null}>
      {trees.length > 0 &&
        trees.map((tree, i) => {
          return (
            <Tree
              pos={[tree.pos.x, tree.pos.y, tree.pos.z]}
              variant={2}
              key={i}
              age={tree.age}
            />
          );
        })}
    </Suspense>
  );
};

const mapStateToProps = ({ state }) => {
  return {
    trees: Object.values(state.trees)
  };
};

export default connect(
  mapStateToProps,
  { fetchTrees }
)(Trees);
