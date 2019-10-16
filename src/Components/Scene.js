import { Canvas } from "react-three-fiber";
import React, { useEffect } from "react";
import Rock from "./Rock";

const Scene = ({ rocks }) => {
  useEffect(() => {}, [rocks]);

  return (
    <Canvas>
      {Object.keys(rocks).map(rock => {
        return (
          <Rock
            x={rocks[rock].x}
            y={rocks[rock].y}
            z={rocks[rock].z}
            color={rocks[rock].color}
          />
        );
      })}
    </Canvas>
  );
};

export default Scene;
