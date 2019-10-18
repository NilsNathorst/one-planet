import React from "react";
import Bird from "./Bird";

const Birds = () => {
  return new Array(10).fill().map((_, i) => {
    const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
    const y = -10 + Math.random() * 20;
    const z = -5 + Math.random() * 10;
    const bird = ["Stork", "Parrot", "Flamingo"][Math.round(Math.random() * 2)];
    let speed = bird === "Stork" ? 0.5 : bird === "Flamingo" ? 2 : 5;
    let factor =
      bird === "Stork"
        ? 0.5 + Math.random()
        : bird === "Flamingo"
        ? 0.25 + Math.random()
        : 1 + Math.random() - 0.5;
    return (
      <Bird
        key={i}
        position={[x, y, z]}
        rotation={[0, x > 0 ? Math.PI : 0, 0]}
        speed={speed}
        factor={factor}
        url={`/models/${bird}.glb`}
      />
    );
  });
};
export default Birds;
