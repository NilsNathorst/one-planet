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

  useEffect(() => {}, [grpRef]);
  useRender(() => {
    sunRef.current.rotation.z += 0.001;
  });

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      <pointLight position={[25, 0, 0]} intensity={1} castShadow={true} />
    </group>
  );
};

export default Sun;
