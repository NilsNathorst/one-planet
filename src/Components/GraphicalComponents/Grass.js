import React, { useContext } from "react";
import pushToDatabase from "../../helpers/pushToDatabase";
import { CanvasContext } from "../Context";
import { useThree } from "react-three-fiber";
const Grass = ({ meshRef, geometry }) => {
  const { treeVectors, setTreeVectors, treeTool } = useContext(CanvasContext);
  const { intersect } = useThree();

  return (
    <mesh
      ref={meshRef}
      receiveShadow
      onClick={() => {
        treeTool &&
          setTreeVectors(treeVectors => [...treeVectors, intersect()[0].point]);
        treeTool && pushToDatabase(treeVectors, "/trees");
      }}
    >
      <bufferGeometry attach="geometry" {...geometry} />
      <meshLambertMaterial
        visible={treeTool ? true : false}
        attach="material"
        wireframe={treeTool ? true : false}
      />
    </mesh>
  );
};

export default Grass;
