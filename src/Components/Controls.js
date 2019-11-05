import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef, useEffect, useCallback } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { connect, useDispatch } from "react-redux";

extend({ TrackballControls });

const Controls = ({ zoomedOut }) => {
  const dispatch = useDispatch();
  const setDispatch = useCallback(
    (type, value) => dispatch({ type: type, payload: value }),
    [dispatch]
  );

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
      setDispatch("SET_ZOOMED_OUT", true);
    } else if (
      orbitRef.current.object.position.distanceTo({
        x: 0,
        y: 0,
        z: 0
      }) < 420 &&
      zoomedOut === true
    ) {
      setDispatch("SET_ZOOMED_OUT", false);
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
const mapStateToProps = ({ state: { zoomedOut } }) => {
  return {
    zoomedOut
  };
};

export default connect(mapStateToProps)(Controls);
