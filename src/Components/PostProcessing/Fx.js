import React, { useEffect, useRef, Suspense } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { connect } from "react-redux";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import * as THREE from "three";
import { WaterPass } from "../../resources/postprocessing/WaterPass";

extend({ EffectComposer, RenderPass, OutlinePass, WaterPass });

const Fx = ({ showInfo, name, isDead }) => {
  const { gl, scene, camera, size } = useThree();

  const outlineP = useRef();
  const composer = useRef();

  const res = new THREE.Vector2(1024, 1024);

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);

  useFrame(() => composer.current.render(), 1);

  return (
    <Suspense fallback={null}>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        {isDead && <waterPass attachArray="passes" factor={1.4} />}
        {name === "QUERY" && (
          <outlinePass
            ref={outlineP}
            attachArray="passes"
            args={[
              res,
              scene,
              camera,
              showInfo.active ? [showInfo.object] : []
            ]}
            pulsePeriod={4}
            renderToScreen
          />
        )}
      </effectComposer>
    </Suspense>
  );
};
const mapStateToProps = ({ state: { showInfo, name, isDead } }) => {
  return {
    showInfo,
    name,
    isDead
  };
};

export default connect(mapStateToProps)(Fx);
