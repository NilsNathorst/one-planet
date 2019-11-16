import React, { useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { addTree, setPlantable, fetchLastPlanted } from "../../actions";
import { useDispatch } from "react-redux";

const Surface = ({
  modelUrl,
  textureUrls,
  plantable,
  addTree,
  name,
  treeModelUrls,
  setPlantable,
  type,
  trees
}) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelUrl, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });
  const [colorMap, bumpMap, normalMap, aoMap] = useLoader(
    TextureLoader,
    textureUrls
  );
  const dispatch = useDispatch();
  const setTool = useCallback(
    value => dispatch({ type: "SET_TOOL", payload: value }),
    [dispatch]
  );
  const treesLength = trees
    ? trees.filter(tree => tree !== "was removed").length
    : 0;

  const hover = e => {
    name === "TREE" && setPlantable(true);
  };
  const unhover = e => {
    name === "TREE" && setPlantable(false);
  };
  const handleClick = e => {
    console.log(treesLength);
    if (plantable && name === "TREE" && treesLength < 100) {
      addTree({
        pos: e.point,
        created_at: Date.now(),
        age: "newborn",
        id: "",
        needsWater: "false",
        treeModelUrls: e.eventObject.treeModelUrls
      });
      setTool("NONE");
    }
  };

  return (
    <mesh
      onPointerOver={e => hover(e)}
      onPointerOut={e => unhover(e)}
      onPointerDown={e => handleClick(e)}
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

const mapStateToProps = ({ state: { name, plantable, isDead, trees } }) => {
  return {
    name,
    plantable,
    isDead,
    trees: trees ? Object.values(trees) : null
  };
};

export default connect(mapStateToProps, {
  addTree,
  setPlantable,
  fetchLastPlanted
})(Surface);
