// Dependencies
import React, { Suspense, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";

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
import Fx from "./PostProcessing/Fx";
import Surface from "./GraphicalComponents/Surface";
// Redux
import { Provider, ReactReduxContext } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";
import InfoBubble from "./Interface/InfoBubble";
import ThoughtBubble from "./Interface/ThoughtBubble";
import CanvasWrapper from "./Interface/CanvasWrapper";
import { setPlanetDead } from "../actions/index";

const App = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  store.dispatch(setPlanetDead());

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <CanvasWrapper>
          <InterfaceWrapper>
            <Hud />
            <Tools />
            <InfoBubble />
            <ThoughtBubble />
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
                    <Provider store={store}>
                      <Clouds />
                      <Controls />
                      <ambientLight intensity={0.5} />
                      <BirdScene />
                      <Background />
                      <Sun />
                      <Dirt />
                      <Surface />
                      <Trees />
                      <Ocean />
                      <SodaCans />
                      <Fx />
                    </Provider>
                  </Suspense>
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
