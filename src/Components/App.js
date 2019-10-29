//DEPENDENCIES
import React, { Suspense, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import { ToolContext } from "./Tools/ToolContext";

//COMPONENTS
import GlobalStyles from "../Styles/GlobalStyle";
import Theme from "../Styles/Theme";
import Controls from "./Controls";
import Dirt from "./GraphicalComponents/Dirt";
import Ocean from "./GraphicalComponents/Ocean";
import SodaCans from "./GraphicalComponents/SodaCan";
import Trees from "./GraphicalComponents/Trees";
import Sun from "./Sun";
import Background from "./GraphicalComponents/Background";
import ToolBelt from "./Tools/ToolBelt";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

const App = () => {
  const [activeTool, setActiveTool] = useState("");
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <ToolContext.Provider value={{ activeTool, setActiveTool }}>
          {/* <ToolBelt /> */}
          <Canvas
            camera={{ position: [0, 0, 200] }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            <Provider store={store}>
              <Controls />
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <Background />
                <Sun />
                <Dirt />
                <Trees />
                <Ocean />
                <SodaCans
                  magnetActive={activeTool === "magnet" ? true : false}
                />
              </Suspense>
            </Provider>
          </Canvas>
        </ToolContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
