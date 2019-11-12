import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, Suspense } from "react";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { fetchTrees, flushTreesDatabase } from "../../actions";
import { setTreeActive } from "../../actions";

const Tree = ({
  variant,
  pos,
  age,
  id,
  setTreeActive,
  fetchTrees,
  needsWater
}) => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const raindrop = useLoader(GLTFLoader, "/models/raindrop/raindrop2.gltf");
  const ref = useRef();
  const raindropRef = useRef();

  const { color } = useSpring({
    color:
      (age === "newborn" && "#9EFF00") ||
      (age === "young" && "#82D100") ||
      (age === "adult" && "#228b22") ||
      (age === "senior" && "#CB7500") ||
      (age === "dead" && "#CB7500"),
    config: { duration: 8000 }
  });

  const { scale } = useSpring({
    scale:
      (age === "newborn" && [0.2, 0.2, 0.2]) ||
      (age === "young" && [0.4, 0.4, 0.4]) ||
      (age === "adult" && [0.6, 0.6, 0.6]) ||
      (age === "senior" && [0.6, 0.6, 0.6]) ||
      (age === "dead" && [0.6, 0.6, 0.6]),
    from: { scale: [0.01, 0.01, 0.01] },
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  }, []);

  return (
    <a.group
      name="tree"
      position={pos}
      ref={ref}
      scale={scale}
      onPointerDown={() => {
        if (age === "newborn" && needsWater === "true") {
          setTreeActive(id);
        }
      }}
    >
      {age === "newborn" && needsWater === "true" && (
        <a.mesh ref={raindropRef} scale={[8, 8, 8]} position={[0, -8, -25]}>
          <a.bufferGeometry
            rotation={[Math.PI / 2, 0, 0]}
            attach="geometry"
            {...raindrop.__$[1].geometry}
          />
          <a.meshStandardMaterial attach="material" color="blue" />
        </a.mesh>
      )}
      {age !== "dead" && (
        <a.mesh>
          <a.bufferGeometry
            name="leaves"
            attach="geometry"
            {...gltf.__$[variant].geometry}
          />
          <a.meshStandardMaterial attach="material" color={color} />
        </a.mesh>
      )}
      <mesh>
        <bufferGeometry
          name="trunk"
          attach="geometry"
          {...gltf.__$[variant + 4].geometry}
        />
        <meshStandardMaterial
          attach="material"
          color={age === "dead" ? "#402009" : "saddlebrown"}
        />
      </mesh>
    </a.group>
  );
};

const Trees = ({ trees, fetchTrees, setTreeActive, flushTreesDatabase }) => {
  useEffect(() => {
    flushTreesDatabase();
    fetchTrees();
  }, [fetchTrees, flushTreesDatabase]);

  return trees.map((tree, i) => {
    return (
      <Suspense fallback={null}>
        {tree.id && tree.pos && (
          <Tree
            pos={[tree.pos.x, tree.pos.y, tree.pos.z]}
            variant={2}
            key={i}
            age={tree.age}
            id={tree.id}
            setTreeActive={setTreeActive}
            fetchTrees={fetchTrees}
            needsWater={tree.needsWater}
          />
        )}
      </Suspense>
    );
  });
};

const mapStateToProps = ({ state: { trees } }) => {
  return {
    trees: trees ? Object.values(trees) : []
  };
};

export default connect(
  mapStateToProps,
  { fetchTrees, setTreeActive, flushTreesDatabase }
)(Trees);
