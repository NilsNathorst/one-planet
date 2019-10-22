import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Bird() {
  const [model, setModel] = useState(null);
  const [mixer] = useState(() => new THREE.AnimationMixer());
  const groupRef = useRef();

  const x = 10;
  const y = 0;
  const z = 0;

  let speed = 2;
  let factor = 1;

  useEffect(() => {
    new GLTFLoader().load("/models/bird/flamingo.gltf", gltf => {
      setModel(gltf);
    });
  }, []);
  useEffect(() => {
    if (model) {
      groupRef.current.scale.set(0.1, 0.1, 0.1);
      groupRef.current.position.y = 6;
      groupRef.current.rotation.x = -Math.PI / 2;
      void mixer.clipAction(model.animations[0], groupRef.current).play();
    }
  }, [model, mixer]);

  useFrame((state, delta) => {
    if (model) {
      groupRef.current.rotation.z +=
        Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
      mixer.update(delta * speed);
    }
  });
  if (model) {
    return (
      <group ref={groupRef}>
        <scene
          name="Scene"
          position={[x, y, z]}
          rotation={[0, x > 0 ? Math.PI : 0, 0]}
          speed={speed}
          factor={factor}
        >
          <mesh
            castShadow
            name="Object_0"
            morphTargetDictionary={
              model.scene.children[0].morphTargetDictionary
            }
            morphTargetInfluences={
              model.scene.children[0].morphTargetInfluences
            }
            rotation={[1.5707964611537577, 0, 0]}
          >
            <bufferGeometry
              attach="geometry"
              {...model.scene.children[0].geometry}
            />
            <meshStandardMaterial
              attach="material"
              {...model.scene.children[0].material}
            />
          </mesh>
        </scene>
      </group>
    );
  } else return null;
}

function BirdScene() {
  return (
    <Suspense fallback={null}>
      <Bird />
    </Suspense>
  );
}

export default BirdScene;
