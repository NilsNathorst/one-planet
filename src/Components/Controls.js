import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
extend({ TrackballControls });

const Controls = ({ disabled }) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <trackballControls
      enableDamping
      maxDistance={340}
      minDistance={60}
      noPan
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
export default Controls;
