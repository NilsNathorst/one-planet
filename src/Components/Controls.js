import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef, useEffect, useState } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setZoomedOut } from "../actions";
import * as THREE from "three";
extend({ TrackballControls });

const Controls = ({ ui, setZoomedOut }) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useEffect(() => {
    console.log(ui);
  }, [ui]);
  useFrame(() => {
    orbitRef.current.update();
    if (
      orbitRef.current.object.position.distanceTo({
        x: 0,
        y: 0,
        z: 0
      }) > 420 &&
      ui.zoomedOut === false
    ) {
      setZoomedOut(true);
    } else if (
      orbitRef.current.object.position.distanceTo({
        x: 0,
        y: 0,
        z: 0
      }) < 420 &&
      ui.zoomedOut === true
    ) {
      setZoomedOut(false);
    }
  });

  return (
    <trackballControls
      enableDamping
      maxDistance={540}
      minDistance={140}
      noPan
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
const mapStateToProps = ({ ui }) => {
  return {
    ui
  };
};

export default connect(
  mapStateToProps,
  { setZoomedOut }
)(Controls);
