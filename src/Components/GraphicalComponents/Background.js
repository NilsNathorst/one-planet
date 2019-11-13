import React, { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "react-three-fiber";
import { connect } from "react-redux";
const Background = ({ isDead }) => {
  const matRef = useRef();

  const [starMap, fireMap] = useLoader(TextureLoader, [
    "/assets/starmap-milkyway.jpg",
    "/assets/sun.jpg"
  ]);
  return (
    <>
      <fog attach="fog" args={[0x87cefa, 550, 800]} />
      <mesh name="bg">
        <sphereBufferGeometry attach="geometry" args={[400, 40, 40]} />
        <meshStandardMaterial side={1} ref={matRef} attach="material">
          <primitive attach="map" object={isDead ? fireMap : starMap} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

const mapStateToProps = ({ state: { isDead } }) => {
  return {
    isDead
  };
};

export default connect(mapStateToProps)(Background);
