import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
const Dirt = () => {
  const gltf = useLoader(GLTFLoader, "/models/planet/new.glb");
  const [colorMap, bumpMap, normalMap] = useLoader(TextureLoader, [
    "/assets/textures/Terrain/Vol_19_4_Base_Color_Light.png",
    "/assets/textures/Terrain/Vol_19_4_Height.png",
    "/assets/textures/Terrain/Vol_19_4_Normal.png"
  ]);

  return (
    <Suspense fallback={null}>
      <group>
        <mesh
          receiveShadow
          scale={[12, 12, 12]}
          position={[0, 0, 0]}
          onPointerOver={e => e.stopPropagation()}
        >
          <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
          <meshStandardMaterial attach="material" roughness={1}>
            <primitive
              attach="map"
              object={colorMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="bumpMap"
              object={bumpMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="normalMap"
              object={normalMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
          </meshStandardMaterial>
        </mesh>
        <mesh
          receiveShadow
          scale={[12, 12, 12]}
          position={[0, 0, 0]}
          onPointerOver={e => e.stopPropagation()}
        >
          <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
          <meshStandardMaterial attach="material" roughness={1}>
            <primitive
              attach="map"
              object={colorMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="bumpMap"
              object={bumpMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="normalMap"
              object={normalMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
          </meshStandardMaterial>
        </mesh>
        <mesh
          receiveShadow
          scale={[12, 12, 12]}
          position={[0, 0, 0]}
          onPointerOver={e => e.stopPropagation()}
        >
          <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
          <meshStandardMaterial attach="material" roughness={1}>
            <primitive
              attach="map"
              object={colorMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="bumpMap"
              object={bumpMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
            <primitive
              attach="normalMap"
              object={normalMap}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              repeat={[4, 4]}
            />
          </meshStandardMaterial>
        </mesh>
      </group>
    </Suspense>
  );
};

export default Dirt;
