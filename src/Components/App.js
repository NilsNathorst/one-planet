//DEPENDENCIES
import React, { Suspense, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import { ToolContext } from "./Tools/ToolContext";
//COMPONENTS
import GlobalStyles from "../Styles/GlobalStyle";
import { TreeProvider } from "./Context/Tree";
import Theme from "../Styles/Theme";
import Controls from "./Controls";
import Dirt from "./GraphicalComponents/Dirt";
import Ocean from "./GraphicalComponents/Ocean";
import Grass from "./GraphicalComponents/Grass";
import SodaCans from "./GraphicalComponents/SodaCan";
import Trees from "./GraphicalComponents/Trees";
import Sun from "./Sun";
import Background from "./GraphicalComponents/Background";
import ToolBelt from "./Tools/ToolBelt";
const App = () => {
  const [activeTool, setActiveTool] = useState("");

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <ToolContext.Provider value={{ activeTool, setActiveTool }}>
          <ToolBelt />

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
              <Grass />
              <SodaCans magnetActive={activeTool === "magnet" ? true : false} />
              <Trees />
              <Ocean />
            </Suspense>
          </Canvas>
        </ToolContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
