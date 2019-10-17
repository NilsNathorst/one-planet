import React, { useRef } from "react";

import * as THREE from "three";

const Globe = () => {
  const globeRef = useRef();

  return (
    <mesh
      ref={globeRef}
      visible
      castShadow
      position={new THREE.Vector3(0, 0, 0)}
      geometry={new THREE.SphereGeometry(0, 5, 5)}
      material={new THREE.MeshPhysicalMaterial()}
    />
  );
};

export default Globe;
