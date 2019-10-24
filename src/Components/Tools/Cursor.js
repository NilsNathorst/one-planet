import React, { useEffect, useRef } from "react";

const Cursor = ({ pos }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <mesh ref={ref} position={pos}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export default Cursor;
