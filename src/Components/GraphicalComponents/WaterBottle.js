import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { randomV3Radians } from "../../helpers/numberGenerators";
const WaterBottle = ({ meshRef, inheritPosition }) => {
  const [model, setModel] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const textureBack = useMemo(() =>
    new THREE.TextureLoader().load(
      "/models/waterbottle/textures/back_label_baseColor.png"
    )
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
    model && setLoaded(true);
  }, [model]);

  return (
    <>
      {model && isLoaded && (
        <group
          ref={meshRef}
          scale={[0.05, 0.05, 0.05]}
          position={inheritPosition}
          rotation={randomV3Radians()}
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

export default WaterBottle;
