// Dependencies
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import styled from "styled-components";

// Components
import GlobalStyles from "../Styles/GlobalStyle";
import Theme from "../Styles/Theme";
import Controls from "./Controls";
import Dirt from "./GraphicalComponents/Dirt";
import Ocean from "./GraphicalComponents/Ocean";
import SodaCans from "./GraphicalComponents/SodaCan";
import Trees from "./GraphicalComponents/Trees";
import Sun from "./Sun";
import Background from "./GraphicalComponents/Background";
import InterfaceWrapper from "./Interface/InterfaceWrapper";
import Tools from "./Interface/Tools";
import BirdScene from "./BirdScene";
import Hud from "./Interface/Hud";
import Clouds from "./GraphicalComponents/Clouds";

// Redux
import { Provider, ReactReduxContext } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

const CanvasWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
`;

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <CanvasWrapper>
          <InterfaceWrapper>
            <Hud />
            <Tools />
            <ReactReduxContext.Consumer>
              {({ store }) => (
                <Canvas
                  camera={{ position: [0, 0, 200] }}
                  onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;
                  }}
                >
                  <Provider store={store}>
                    <Suspense fallback={null}>
                      <Controls />
                      <ambientLight intensity={0.5} />
                      <BirdScene />
                      <Background />
                      <Sun />
                      <Clouds />
                      <Dirt />
                      <Suspense fallback={null}>
                        <Trees />
                      </Suspense>
                      <Ocean />
                      {/* <SodaCans /> */}
                    </Suspense>
                  </Provider>
                </Canvas>
              )}
            </ReactReduxContext.Consumer>
          </InterfaceWrapper>
        </CanvasWrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
