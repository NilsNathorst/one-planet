import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, a } from "react-spring/three";

const Tree = () => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const ref = useRef();
  const trunkRef = useRef();
  const [animated, setAnimated] = useState(false);
  const { scale, ...props } = useSpring({
    scale: animated ? [1, 1, 1] : [0.1, 0.1, 0.1],
    config: { duration: 5000 }
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <a.group
      position={[17, 18, 42]}
      ref={ref}
      scale={scale}
      onPointerDown={() => {
        setAnimated(!animated);
        console.log(animated);
      }}
    >
      <mesh>
        <bufferGeometry
          name="leaves"
          attach="geometry"
          {...gltf.__$[3].geometry}
        />
        <meshStandardMaterial attach="material" color="forestgreen" />
      </mesh>
      <mesh ref={trunkRef}>
        <bufferGeometry
          name="trunk"
          attach="geometry"
          {...gltf.__$[7].geometry}
        />
        <meshStandardMaterial attach="material" color="saddlebrown" />
      </mesh>
    </a.group>
  );
};

const Trees = () => {
  return <Tree />;
};

export default Trees;
