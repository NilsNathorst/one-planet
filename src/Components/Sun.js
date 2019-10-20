import React, { useRef, useEffect, useState } from "react";
import { useRender } from "react-three-fiber";
import * as THREE from "three";
const Sun = () => {
  const sunRef = useRef();
  var angle = 0;
  const grpRef = useRef();
  const date = new Date();
  const [timeOfDay, setTimeOfDay] = useState(0);
  useEffect(() => {
    setTimeOfDay(date.getHours());
  }, []);

  useEffect(() => {
    console.log(sunRef);
  }, [grpRef]);
  useRender(() => {
    sunRef.current.rotation.z += 0.03;
  });
  console.log(timeOfDay);
  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <mesh position={[10, 0, 0]} visible>
        <meshLambertMaterial
          attach="material"
          color={timeOfDay > 17 ? "blue" : "yellow"}
        />
        <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      </mesh>
      <pointLight position={[10, 0, 0]} intensity={2} castShadow={true} />
    </group>
  );
};

export default Sun;
