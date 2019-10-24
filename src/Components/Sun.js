import React from "react";

const Sun = () => {
  return (
    <group position={[0, 0, 0]}>
      <hemisphereLight args={["white", "blue", 1]} />
      <pointLight intensity={0.3} position={[0, 25, 0]} castShadow />
    </group>
  );
};

export default Sun;
