//DEPENDENCIES
import React, { Suspense, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import { ToolContext } from "./Tools/ToolContext";

import styled from "styled-components";

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

import { CursorContext } from "./Context/CursorContext";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";
import plantIcon from "../assets/icons/plantable.png";
import noPlantIcon from "../assets/icons/notPlantable.png";
const Wrapper = styled.div`
  cursor: ${props =>
    props.activeTool === "seed" && props.hovering
      ? props.plantable
        ? `url(${plantIcon}), auto`
        : `url(${noPlantIcon}), auto`
      : "default"};
  height: 100%;
  width: 100%;
`;
const CanvasWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
`;

const App = () => {
  const [activeTool, setActiveTool] = useState("");
  const [plantable, setPlantable] = useState(false);
  const [hovering, setHovering] = useState(false);
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  return (
    <Wrapper activeTool={activeTool} hovering={hovering} plantable={plantable}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <ToolContext.Provider value={{ activeTool, setActiveTool }}>
          <ToolBelt />
          <Suspense>
            <CanvasWrapper>
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
            </CanvasWrapper>
          </Suspense>
        </ToolContext.Provider>
      </ThemeProvider>
    </Wrapper>
  );
};

export default App;
