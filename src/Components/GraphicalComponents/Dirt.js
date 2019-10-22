import React from "react";

const Dirt = ({ meshRef, geometry }) => {
  return (
    <mesh ref={meshRef} receiveShadow>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshLambertMaterial attach="material" color="brown" />
    </mesh>
  );
};

export default Dirt;
