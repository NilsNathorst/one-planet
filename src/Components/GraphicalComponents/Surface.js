import React, { useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
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
  fetchLastPlanted,
  last_planted
}) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");
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
    <group>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
        onPointerDown={e => handleClick(e)}
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="africa"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial
          attach="material"
          color="green"
          roughness={1}
        ></meshStandardMaterial>
      </mesh>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
        onPointerDown={e => handleClick(e)}
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="scandinavia"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
        <meshStandardMaterial attach="material" color="#FFC857" roughness={1} />
      </mesh>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
        onPointerDown={e => handleClick(e)}
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="oceania"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
        <meshStandardMaterial
          attach="material"
          color="whitesmoke"
          roughness={1}
        />
      </mesh>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
        onPointerDown={e => handleClick(e)}
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="america"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
        <meshStandardMaterial attach="material" color="hotpink" roughness={1} />
      </mesh>
    </group>
  );
};
const mapStateToProps = ({ state: { name, plantable, last_planted } }) => {
  return {
    name,
    plantable,
    last_planted
  };
};

export default connect(
  mapStateToProps,
  { addTree, setShowInfo, setPlantable, fetchLastPlanted }
)(Surface);
