import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, Suspense } from "react";
import { useSpring, a, config } from "react-spring/three";
import { connect } from "react-redux";
import { fetchTrees, flushTreesDatabase } from "../../actions";
import { setTreeActive } from "../../actions";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
const Tree = ({ isDead, pos, age, id, setTreeActive, needsWater, treeUrl }) => {
  const raindrop = useLoader(GLTFLoader, "/models/raindrop/raindrop2.gltf");
  const ref = useRef();
  const raindropRef = useRef();
  const gltf = useLoader(GLTFLoader, treeUrl, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });

  const { color } = useSpring({
    color:
      (age === "newborn" && "#BFDC6E") ||
      (age === "young" && "#779F55") ||
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

  let leavesGeo = 1;
  let trunkGeo = 2;
  if (treeUrl === "/models/trees/palm/palm.glb") {
    leavesGeo = 2;
    trunkGeo = 1;
  }
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
      {!isDead && age === "newborn" && needsWater === "true" && (
        <a.mesh ref={raindropRef} scale={[8, 8, 8]} position={[0, -8, -25]}>
          <a.bufferGeometry
            rotation={[Math.PI / 2, 0, 0]}
            attach="geometry"
            {...raindrop.__$[1].geometry}
          />
          <a.meshStandardMaterial attach="material" color="#2191FB" />
        </a.mesh>
      )}
      {!isDead && age !== "dead" && (
        <a.mesh>
          <a.bufferGeometry
            name="leaves"
            attach="geometry"
            {...gltf.__$[leavesGeo].geometry}
          />
          <a.meshStandardMaterial attach="material" color={color} />
        </a.mesh>
      )}
      <mesh>
        <bufferGeometry
          name="trunk"
          attach="geometry"
          {...gltf.__$[trunkGeo].geometry}
        />
        <meshStandardMaterial
          attach="material"
          color={age === "dead" ? "#402009" : "#52403C"}
        />
      </mesh>
    </a.group>
  );
};

const Trees = ({
  isDead,
  trees,
  fetchTrees,
  setTreeActive,
  flushTreesDatabase
}) => {
  useEffect(() => {
    flushTreesDatabase();
    fetchTrees();
  }, [fetchTrees, flushTreesDatabase]);

  return trees.map(tree => {
    return (
      <Suspense fallback={null}>
        {tree.id && tree.pos && (
          <Tree
            isDead={isDead}
            pos={[tree.pos.x, tree.pos.y, tree.pos.z]}
            variant={2}
            age={tree.age}
            id={tree.id}
            treeUrl={tree.treeUrl}
            setTreeActive={setTreeActive}
            needsWater={tree.needsWater}
          />
        )}
      </Suspense>
    );
  });
};

const mapStateToProps = ({ state: { trees, isDead } }) => {
  return {
    trees: trees ? Object.values(trees) : [],
    isDead
  };
};

export default connect(mapStateToProps, {
  fetchTrees,
  setTreeActive,
  flushTreesDatabase
})(Trees);
