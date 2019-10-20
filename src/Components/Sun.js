import React, { useRef } from "react";
import { useRender } from "react-three-fiber";

const Sun = ({ position }) => {
  const sunRef = useRef();
  useRender(() => {
    sunRef.current.position.y += 0.05;
    sunRef.current.position.setLength(13);
  });

  return (
    <group ref={sunRef} position={[...position]}>
      <mesh visible>
        <meshLambertMaterial attach="material" color="yellow" />
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      </mesh>
      <pointLight position={[...position]} intensity={2} castShadow={true} />
    </group>
  );
};

export default Sun;
