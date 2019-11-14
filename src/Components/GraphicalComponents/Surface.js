import React, { useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import {
  addTree,
  setShowInfo,
  setPlantable,
  fetchLastPlanted
} from "../../actions";
import { useDispatch } from "react-redux";

const Surface = ({
  modelUrl,
  textureUrls,
  plantable,
  addTree,
  setShowInfo,
  name,
  treeUrl,
  setPlantable,
  isDead,
  fetchLastPlanted,
  lastPlanted,
  type
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

  const hover = e => {
    e.stopPropagation();
    name === "QUERY" &&
      setShowInfo({
        active: true,
        object: e.eventObject
      });
    name === "TREE" && setPlantable(true);
  };
  const unhover = e => {
    name === "QUERY" && setShowInfo({ active: false, object: null });
    name === "TREE" && setPlantable(false);
  };
  const handleClick = e => {
    if (plantable && name === "TREE") {
      fetchLastPlanted();
      if (Date.now() - lastPlanted > 1000 * 2 || lastPlanted === null) {
        addTree({
          pos: e.point,
          created_at: Date.now(),
          age: "newborn",
          id: "",
          needsWater: "false",
          treeUrl: e.eventObject.treeUrl
        });
        setTool("NONE");
      }
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
      treeUrl={treeUrl}
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

const mapStateToProps = ({
  state: { name, plantable, isDead, lastPlanted }
}) => {
  return {
    name,
    plantable,
    isDead,
    lastPlanted
  };
};

export default connect(mapStateToProps, {
  addTree,
  setShowInfo,
  setPlantable,
  fetchLastPlanted
})(Surface);
