import React from "react";

const Sun = () => {
  return (
    <group position={[0, 0, 0]}>
      <hemisphereLight args={["white", "midnightblue", 1]} />
      <pointLight intensity={0.8} position={[0, 255, 200]} castShadow />
    </group>
  );
};

export default Sun;
