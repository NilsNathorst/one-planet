import React, { useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
import * as THREE from "three";

import {
  addTree,
  setShowInfo,
  setPlantable,
  fetchLastPlanted
} from "../../actions";
import { useDispatch } from "react-redux";

const Surface = ({
  plantable,
  addTree,
  setShowInfo,
  name,
  setPlantable,
  isDead,   
  fetchLastPlanted,
  last_planted
}) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/planet/new.glb");
  const [colorMap, bumpMap, normalMap, aoMap] = useLoader(TextureLoader, [
    "/assets/textures/Grass/Vol_42_1_Base_Color.png",
    "/assets/textures/Grass/Vol_42_1_Height.png",
    "/assets/textures/Grass/Vol_42_1_Normal.png",
    "/assets/textures/Grass/Vol_42_1_Ambient_Occlusion.png"
  ]);
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
      if (Date.now() - last_planted > 1000 * 60 || last_planted === null) {
        addTree({
          pos: e.point,
          created_at: Date.now(),
          age: "newborn",
          id: "",
          needsWater: "false"
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
      scale={[12.14, 12.14, 12.14]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[8].geometry} />
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

const mapStateToProps = ({ state: { name, plantable, isDead, last_planted } }) => {
  return {
    name,
    plantable,
    isDead, 
    last_planted
  };
};

export default connect(mapStateToProps, { addTree, setShowInfo, setPlantable, fetchLastPlanted })(
  Surface
);

