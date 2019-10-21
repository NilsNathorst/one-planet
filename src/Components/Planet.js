import React, { useEffect, useState, useRef, useContext } from "react";
import * as CANNON from "cannon";
import { useCannon } from "../helpers/useCannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "react-three-fiber";
import { database } from "../database/firebase.js";
import { CanvasContext } from "./Context";
import pushToDatabase from "../helpers/pushToDatabase";
const Planet = ({ position }) => {
  const surfaceRef = useRef();
  const [model, setModel] = useState(null);

  const { treeVectors, setTreeVectors, treeTool } = useContext(CanvasContext);
  const workableSurfaceRef = useRef();
  const waterRef = useRef();
  const planetRef = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Sphere(4.9));
    body.position.set(...position);
  });

  const {
    intersect // Calls onMouseMove handlers for objects underneath the cursor
  } = useThree();

  useEffect(() => {
    new GLTFLoader().load("/models/planet/newplanet.gltf", setModel);
    database.ref("/").on("value", snapshot => {
      setTreeVectors(snapshot.val().trees);
    });
  }, []);

  useEffect(() => {
    model && planetRef.current.scale.set(3.2, 3.2, 3.2);
    model && console.log(model.scene);

    model && workableSurfaceRef.current.rotateX(-Math.PI / 2);
    model && workableSurfaceRef.current.scale.set(1.01, 1.01, 1.01);
  }, [model]);

  return (
    model && (
      <group ref={planetRef} position={[0, 0, 0]}>
        <mesh ref={surfaceRef} receiveShadow>
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[1].geometry}
          />
          <meshLambertMaterial attach="material" color="brown" />
        </mesh>
        <mesh
          ref={workableSurfaceRef}
          receiveShadow
          onClick={() => {
            treeTool &&
              setTreeVectors(treeVectors => [
                ...treeVectors,
                intersect()[0].point
              ]);
            treeTool && pushToDatabase(treeVectors, "/trees");
          }}
        >
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[0].geometry}
          />
          <meshLambertMaterial
            visible={treeTool ? true : false}
            attach="material"
            wireframe={treeTool ? true : false}
          />
        </mesh>
        <mesh ref={waterRef} receiveShadow>
          <bufferGeometry
            attach="geometry"
            {...model.scene.children[2].geometry}
          />
          <meshLambertMaterial attach="material" color="#158BC6" />
        </mesh>
      </group>
    )
  );
};

export default Planet;
