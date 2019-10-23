import React, { useRef } from "react";

const Sun = () => {
  const sunRef = useRef();
  const spotRef = useRef();
  // useRender(() => {
  //   sunRef.current.rotation.z += 0.03;
  // });

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <hemisphereLight args={["white", "blue", 1]} />
      <pointLight
        ref={spotRef}
        intensity={0.3}
        position={[0, 25, 0]}
        castShadow
      />
    </group>
  );
};

export default Sun;
