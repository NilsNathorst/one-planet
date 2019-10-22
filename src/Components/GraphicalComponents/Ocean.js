import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Ocean = ({ meshRef, geometry }) => {
  const [model, setModel] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const bottleRef = useRef();
  const textureBack = useMemo(() =>
    new THREE.TextureLoader().load(
      "/models/waterbottle/textures/back_label_baseColor.png"
    )
  );
  const setFromSpherical = new THREE.Vector3().setFromSphericalCoords(
    1.6,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  const textureFront = useMemo(() =>
    new THREE.TextureLoader().load(
      "/models/waterbottle/textures/fiji_label_baseColor.png"
    )
  );
  useEffect(() => {
    new GLTFLoader().load("/models/waterbottle/scene.gltf", setModel);
  }, []);

  useEffect(() => {
    model &&
      console.log(
        model.scene.children[0].children[0].children[0].children[0].children[1]
          .children[1] //bottlecap
      );
    model && setLoaded(true);
  }, [model]);

  useRender(() => {
    if (model && isLoaded) {
    }
  });
  return (
    <>
      <mesh ref={meshRef} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshLambertMaterial attach="material" color="#158BC6" />
      </mesh>
      {model && isLoaded && (
        <group
          ref={bottleRef}
          scale={[0.1, 0.1, 0.1]}
          position={setFromSpherical}
        >
          <mesh>
            <bufferGeometry
              attach="geometry"
              {...model.scene.children[0].children[0].children[0].children[0]
                .children[0].children[0].geometry}
            />
            <meshStandardMaterial attach="material"></meshStandardMaterial>
          </mesh>
          <mesh>
            <bufferGeometry
              attach="geometry"
              {...model.scene.children[0].children[0].children[0].children[0]
                .children[0].children[1].geometry}
            />
            <meshStandardMaterial attach="material">
              <primitive attach="map" object={textureFront} />
            </meshStandardMaterial>
          </mesh>
          <mesh>
            <bufferGeometry
              attach="geometry"
              {...model.scene.children[0].children[0].children[0].children[0]
                .children[0].children[2].geometry}
            />
            <meshStandardMaterial attach="material">
              <primitive attach="map" object={textureBack} />
            </meshStandardMaterial>
          </mesh>
          <mesh position={[0, 0, 2]} scale={[0.2, 0.2, 0.2]}>
            <bufferGeometry
              attach="geometry"
              {...model.scene.children[0].children[0].children[0].children[0]
                .children[1].children[1].geometry}
            />
            <meshStandardMaterial attach="material"></meshStandardMaterial>
          </mesh>
        </group>
      )}
    </>
  );
};

export default Ocean;
