import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
import { addTree } from "../../actions";
import { setShowInfo } from "../../actions";
const Surface = ({ setShowInfo, name }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");
  const hover = e => {
    e.stopPropagation();
    name === "QUERY" &&
      setShowInfo({
        active: true,
        object: e.eventObject
      });
  };
  const unhover = e => {
    setShowInfo({ active: false, object: null });
  };
  return (
    <group>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="africa"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
        <meshStandardMaterial attach="material" color="green" roughness={1} />
      </mesh>
      <mesh
        onPointerOver={e => hover(e)}
        onPointerOut={e => unhover(e)}
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
const mapStateToProps = ({ state: { name } }) => {
  return {
    name
  };
};

export default connect(
  mapStateToProps,
  { setShowInfo }
)(Surface);
