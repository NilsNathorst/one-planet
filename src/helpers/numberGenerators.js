import * as THREE from "three";

const generateVector3Between = (from, to) => {
  const randNum = Math.random() * (to - from) + from;
  return [randNum, randNum, randNum];
};
const setFromSpherical = (mouseX, mouseY) => {
  return new THREE.Vector3().setFromSphericalCoords(
    5,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
};

const randomV3Radians = () => {
  return [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  ];
};

export { randomV3Radians, generateVector3Between };
