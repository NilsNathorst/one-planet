import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef, useEffect } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { connect } from "react-redux";
import { setZoomedOut } from "../actions";

extend({ TrackballControls });

const Controls = ({ zoomedOut, setZoomedOut }) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useEffect(() => {}, [zoomedOut]);
  useFrame(() => {
    orbitRef.current.update();
    if (
      orbitRef.current.object.position.distanceTo({
        x: 0,
        y: 0,
        z: 0
      }) > 420 &&
      zoomedOut === false
    ) {
      setZoomedOut(true);
    } else if (
      orbitRef.current.object.position.distanceTo({
        x: 0,
        y: 0,
        z: 0
      }) < 420 &&
      zoomedOut === true
    ) {
      setZoomedOut(false);
    }
  });

  return (
    <trackballControls
      enableDamping
      maxDistance={540}
      minDistance={10}
      noPan
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
const mapStateToProps = ({ state }) => {
  return {
    zoomedOut: state.zoomedOut
  };
};

export default connect(
  mapStateToProps,
  { setZoomedOut }
)(Controls);
