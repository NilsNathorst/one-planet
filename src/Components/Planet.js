import React, { useEffect, useState, useRef, useContext } from "react";
import * as CANNON from "cannon";
import { useCannon } from "../helpers/useCannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRender } from "react-three-fiber";
import { database } from "../database/firebase.js";
import { CanvasContext } from "./Context";
import Ocean from "./GraphicalComponents/Ocean";
import Grass from "./GraphicalComponents/Grass";
import Dirt from "./GraphicalComponents/Dirt";
const Planet = ({ children, position }) => {
  const surfaceRef = useRef();
  const [model, setModel] = useState(null);

  const { setTreeVectors } = useContext(CanvasContext);
  const workableSurfaceRef = useRef();
  const waterRef = useRef();
  const planetRef = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Sphere(4.9));
    body.position.set(...position);
  });

  useEffect(() => {
    new GLTFLoader().load("/models/planet/newplanet.gltf", setModel);
    database.ref("/").on("value", snapshot => {
      setTreeVectors(snapshot.val().trees);
    });
  }, [setTreeVectors]);

  useEffect(() => {
    model && planetRef.current.scale.set(3.2, 3.2, 3.2);
    model && waterRef.current.scale.set(1.02, 1.02, 1.02);
    model && workableSurfaceRef.current.rotateX(-Math.PI / 2);
    model && workableSurfaceRef.current.scale.set(1.01, 1.01, 1.01);
  }, [model, planetRef]);
  let anim = 0;
  useRender(() => {
    model && planetRef.current.rotateX(anim);
    anim += 0.0003;
  });
  return (
    model && (
      <group ref={planetRef} position={[0, 0, 0]}>
        <Dirt
          meshRef={surfaceRef}
          geometry={model.scene.children[1].geometry}
        />
        <Grass
          meshRef={workableSurfaceRef}
          geometry={model.scene.children[0].geometry}
        />
        <Ocean meshRef={waterRef} geometry={model.scene.children[2].geometry} />
        {children}
      </group>
    )
  );
};

export default Planet;
