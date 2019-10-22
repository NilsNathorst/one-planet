import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRender, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Ocean = ({ meshRef, geometry }) => {
  const [model, setModel] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [vectorsArray, setVectorsArray] = useState([]);
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
    model &&
      console.log(
        model.scene.children[0].children[0].children[0].children[0].children[1]
          .children[1] //bottlecap
      );
    model && setLoaded(true);
  }, [model]);
  useEffect(() => {
    new GLTFLoader().load("/models/waterbottle/scene.gltf", setModel);
    const position = meshRef.current.geometry.attributes.position;
    const vector = new THREE.Vector3();
    const vectorArr = [];

    for (let i = 0, length = position.length; i < length; i++) {
      vector.fromBufferAttribute(position, i);
      vector.applyMatrix4(meshRef.current.matrixWorld);
      let x = Math.trunc(vector.x * 100) / 100;
      let y = Math.trunc(vector.y * 100) / 100;
      let z = Math.trunc(vector.z * 100) / 100;
      const newVector = new THREE.Vector3(x, y, z);
      vectorArr.push(newVector);
    }

    const filterfunc = (a, key) => {
      var seen = {};
      return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      });
    };
    setVectorsArray(filterfunc(vectorArr, JSON.stringify));
  }, []);

  let random = Math.floor(Math.random() * 10000);

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
          <mesh
            position={[
              vectorsArray[random].x,
              vectorsArray[random].y,
              vectorsArray[random].z
            ]}
            scale={[0.2, 0.2, 0.2]}
          >
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
