import React, { useRef, useEffect, useState } from "react";
import { useRender } from "react-three-fiber";
import * as THREE from "three";
const Sun = () => {
  const sunRef = useRef();

  // useRender(() => {
  //   sunRef.current.rotation.z += 0.001;
  // });

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <pointLight position={[25, 0, 0]} intensity={1} castShadow={true} />
    </group>
  );
};

export default Sun;
