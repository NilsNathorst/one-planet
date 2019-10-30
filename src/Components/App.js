//DEPENDENCIES
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";

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
import InterfaceWrapper from "./Interface/InterfaceWrapper";
import Tools from "./Interface/Tools";
import Start from "./Interface/Start";
import BirdScene from "./BirdScene";
// Redux
import { Provider, ReactReduxContext } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

import Hud from "./Interface/Hud";

const CanvasWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
`;

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <CanvasWrapper>
        <Provider store={store}>
          <InterfaceWrapper>
            <Start />
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
                  <Suspense fallback={null}>
                    <Controls store={store} />
                    <ambientLight intensity={0.5} />
                    <BirdScene />
                    <Background />
                    <Sun />
                    <Dirt store={store} />
                    <Suspense fallback={null}>
                      <Trees store={store} />
                    </Suspense>
                    <Ocean />
                    <SodaCans store={store} />
                  </Suspense>
                </Canvas>
              )}
            </ReactReduxContext.Consumer>
          </InterfaceWrapper>
        </Provider>
      </CanvasWrapper>
    </ThemeProvider>
  );
};

export default App;
