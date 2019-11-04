import React, { useCallback, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
const Dirt = props => {
  const dispatch = useDispatch();
  const setDispatch = useCallback(
    (type, value) => dispatch({ type: type, payload: value }),
    [dispatch]
  );
  useEffect(() => {
    props.actions.fetchPlanetEnd();
  }, []);

  var date = new Date(props.state.planet_end);

  const gltf = useLoader(GLTFLoader, "/models/planet/newplanet.gltf");
  return (
    <mesh
      receiveShadow
      onPointerDown={e => {
        if (props.state.plantable && props.state.name === "TREE") {
          props.actions.addTree({ pos: e.point, created_at: Date.now() });
        }
      }}
      onPointerMove={e => {
        if (props.state.name === "TREE") {
          e.stopPropagation();
          if (e.point.length() > 80 && props.state.plantable === false) {
            setDispatch("SET_PLANTABLE", true);
          } else if (e.point.length() < 80 && props.state.plantable === true) {
            setDispatch("SET_PLANTABLE", false);
          }
        }
      }}
      onPointerOver={() =>
        props.state.name === "TREE" && setDispatch("SET_HOVER", true)
      }
      onPointerOut={() =>
        props.state.name === "TREE" && setDispatch("SET_HOVER", true)
      }
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
