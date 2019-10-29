import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

const Dirt = props => {
  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  // const { setHovering, setPlantable } = useContext(CursorContext);
  console.log(props);
  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        props.actions.setTool({ text: "fart" });
        console.log(props);
      }}
      // onPointerMove={e => {
      //   e.stopPropagation();
      //   if (e.point.length() > 80) {
      //     setPlantable(true);
      //   } else {
      //     setPlantable(false);
      //   }
      // }}
      // onPointerOver={() => setHovering(true)}
      // onPointerOut={() => setHovering(false)}
      scale={[29.3, 29.3, 29.3]}
      position={[0, 0, 0]}
    >
      <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
      <meshStandardMaterial attach="material" color="sienna" roughness={1} />
    </mesh>
  );
};
const mapStateToProps = ({ data, state }) => {
  return {
    data,
    state
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dirt);
