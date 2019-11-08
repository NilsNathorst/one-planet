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

  const { color } = useSpring({
    color:
      (age === "young" && "#9EFF00") ||
      (age === "adult" && "#228B22") ||
      (age === "dead" && "#CB7500"),
    config: { duration: 6000 }
  });

  const { scale } = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0.01, 0.01, 0.01] },
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);

  return (
    <a.group position={pos} ref={ref} scale={scale} name="tree">
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
      {trees &&
        trees.map((tree, i) => (
          <Tree
            pos={[tree.pos.x, tree.pos.y, tree.pos.z]}
            variant={2}
            key={i}
            age={tree.age}
          />
        ))}
    </Suspense>
  );
};

const mapStateToProps = ({ state }) => {
  return {
    trees: state.trees ? Object.values(state.trees) : null
  };
};

export default connect(
  mapStateToProps,
  { fetchTrees }
)(Trees);
