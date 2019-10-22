import React, { useRef } from "react";

const Sun = () => {
  const sunRef = useRef();

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <pointLight position={[25, 0, 0]} intensity={1} castShadow={true} />
    </group>
  );
};

export default Sun;
