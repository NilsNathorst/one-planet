//DEPENDENCIES
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
//COMPONENTS
import GlobalStyles from "../Styles/GlobalStyle";
import Theme from "../Styles/Theme";
import Controls from "./Controls";
import Dirt from "./GraphicalComponents/Dirt";
import Ocean from "./GraphicalComponents/Ocean";
import Grass from "./GraphicalComponents/Grass";
import SodaCans from "./GraphicalComponents/SodaCan";
import Trees from "./GraphicalComponents/Trees";
import Sun from "./Sun";
import Background from "./GraphicalComponents/Background";
const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Canvas
          camera={{ position: [0, 0, 100] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <Controls />
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Background />
            <Sun />
            <Dirt />
            <Ocean />
            <Grass />
            <SodaCans />
            <Trees />
          </Suspense>
        </Canvas>
      </ThemeProvider>
    </>
  );
};

export default App;
