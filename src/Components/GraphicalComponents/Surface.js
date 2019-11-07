import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
import { addTree } from "../../actions";

const Surface = props => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/planet/continentsplanet.gltf");

  return (
    <group>
      <mesh
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
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="america"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
        <meshStandardMaterial attach="material" color="#FFC857" roughness={1} />
      </mesh>
      <mesh
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="america"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
        <meshStandardMaterial
          attach="material"
          color="whitesmoke"
          roughness={1}
        />
      </mesh>
      <mesh
        ref={ref}
        receiveShadow
        scale={[30.4, 30.4, 30.4]}
        position={[0, 0, 0]}
        name="america"
      >
        <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
        <meshStandardMaterial attach="material" color="green" roughness={1} />
      </mesh>
    </group>
  );
};
const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  { addTree }
)(Surface);
