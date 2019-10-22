import * as THREE from "three";

const generateVector3Between = (from, to) => {
  const randNum = Math.random() * (to - from) + from;
  return [randNum, randNum, randNum];
};

const randomV3Radians = () => {
  return [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  ];
};

const setFromSpherical = (radius, theta, phi) => {
  return new THREE.Vector3().setFromSphericalCoords(
    radius ? radius : 1.5,
    theta ? theta : Math.random() * Math.PI,
    phi ? phi : Math.random() * Math.PI
  );
};

export { randomV3Radians, generateVector3Between, setFromSpherical };
