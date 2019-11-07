import React, { useEffect, useRef } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

extend({ EffectComposer, RenderPass, FilmPass, BloomPass });

function Effects() {
  const { gl, scene, camera, size } = useThree();
  const filmp = useRef();
  const bloomp = useRef();
  const composer = useRef();
  useEffect(() => {
    console.log(filmp, bloomp);
  }, []);
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);
  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      {/* <filmPass
        ref={filmp}
        attachArray="passes"
        args={[0.35, 0.025, 648, false]}
        renderToScreen
      /> */}
    </effectComposer>
  );
}
export default Effects;
