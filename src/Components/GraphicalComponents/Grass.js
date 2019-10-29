import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import React, { useRef } from "react";

const Grass = () => {
  const gltf = useLoader(GLTFLoader, "/models/grass/scene.gltf");
  const ref = useRef();
  console.log(gltf);
  return null;
};

export default Grass;
