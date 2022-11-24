import React, { useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import { connect, useDispatch } from "react-redux";

import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { addTree, setPlantable } from "../../actions";

const Surface = ({
  modelUrl,
  textureUrls,
  addTree,
  name,
  treeModelUrls,
  setPlantable,
  type,
  trees,
  treeCooldown,
}) => {
  const dispatch = useDispatch();
  const setCooldown = useCallback(
    (type, value) => dispatch({ type: type, payload: value }),
    [dispatch]
  );
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });
  const [colorMap, bumpMap, normalMap, aoMap] = useLoader(
    TextureLoader,
    textureUrls
  );

  const treesLength = trees
    ? trees.filter((tree) => tree !== "was removed").length
    : 0;

  const hover = (e) => {
    e.stopPropagation();
    name === "TREE" && setPlantable(true);
  };
  const unhover = (e) => {
    name === "TREE" && setPlantable(false);
  };
  const handleClick = (e) => {
    addTree({
      pos: e.point,
      created_at: Date.now(),
      age: "newborn",
      id: "",
      needsWater: "false",
      treeModelUrls: e.eventObject.treeModelUrls,
    });
    setCooldown("SET_TREE_COOLDOWN", true);
    setTimeout(() => {
      setCooldown("SET_TREE_COOLDOWN", false);
    }, 100);
  };

  return (
    <mesh
      onPointerOver={(e) => hover(e)}
      onPointerOut={(e) => unhover(e)}
      onPointerDown={(e) => handleClick(e)}
      ref={ref}
      receiveShadow
      scale={[12, 12, 12]}
      position={[0, 0, 0]}
      name={type}
      treeModelUrls={treeModelUrls}
      objType="continent"
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" roughness={1}>
        <primitive
          attach="map"
          object={colorMap}
          wrapT={THREE.RepeatWrapping}
          wrapS={THREE.RepeatWrapping}
          repeat={[10, 10]}
        />
        <primitive
          attach="bumpMap"
          object={bumpMap}
          wrapT={THREE.RepeatWrapping}
          wrapS={THREE.RepeatWrapping}
          repeat={[10, 10]}
        />
        <primitive
          attach="normalMap"
          object={normalMap}
          wrapT={THREE.RepeatWrapping}
          wrapS={THREE.RepeatWrapping}
          repeat={[10, 10]}
        />
        <primitive
          attach="lightMap"
          object={aoMap}
          wrapT={THREE.RepeatWrapping}
          wrapS={THREE.RepeatWrapping}
          repeat={[10, 10]}
        />
      </meshStandardMaterial>
    </mesh>
  );
};

const mapStateToProps = ({ state: { name, isDead, trees, treeCooldown } }) => {
  return {
    name,

    isDead,
    trees: trees ? Object.values(trees) : null,
    treeCooldown,
  };
};

export default connect(mapStateToProps, {
  addTree,
  setPlantable,
})(Surface);
