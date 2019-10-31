import * as THREE from "three";

const generateVector3Between = (from, to) => {
  const randNum = Math.random() * (to - from) + from;
  return [randNum, randNum, randNum];
};
const setFromSpherical = radius => {
  return new THREE.Vector3().setFromSphericalCoords(
    radius,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
};

const randomV3Radians = () => {
  return [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  ];
};

export { randomV3Radians, generateVector3Between, setFromSpherical };
