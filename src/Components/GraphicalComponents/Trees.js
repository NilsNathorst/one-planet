import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, a, config } from "react-spring/three";

const Tree = ({ variant, pos }) => {
  const gltf = useLoader(GLTFLoader, "/models/trees/trees.gltf");
  const ref = useRef();
  const trunkRef = useRef();
  const [animated, setAnimated] = useState(false);
  const { scale, ...props } = useSpring({
    scale: animated ? [0.3, 0.3, 0.3] : [0.1, 0.1, 0.1],
    config: config.wobbly
  });

  useEffect(() => {
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <a.group
      position={pos}
      ref={ref}
      scale={scale}
      onPointerDown={() => {
        setAnimated(!animated);
      }}
    >
      <mesh>
        <bufferGeometry
          name="leaves"
          attach="geometry"
          {...gltf.__$[variant].geometry}
        />
        <meshStandardMaterial attach="material" color="forestgreen" />
      </mesh>
      <mesh ref={trunkRef}>
        <bufferGeometry
          name="trunk"
          attach="geometry"
          {...gltf.__$[variant + 4].geometry}
        />
        <meshStandardMaterial attach="material" color="saddlebrown" />
      </mesh>
    </a.group>
  );
};

const Trees = () => {
  return (
    <>
      <Tree pos={[17, 18, 42]} variant={1} />
      <Tree pos={[17, 20, 42]} variant={2} />
      <Tree pos={[17, 22, 40]} variant={3} />
      <Tree pos={[17, 24, 40]} variant={4} />
    </>
  );
};

export default Trees;
