import React from "react";

const Ocean = ({ meshRef, geometry }) => {
  return (
    <mesh ref={meshRef} receiveShadow>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshLambertMaterial attach="material" color="#158BC6" />
    </mesh>
  );
};

export default Ocean;
