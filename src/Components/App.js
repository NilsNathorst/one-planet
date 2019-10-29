//DEPENDENCIES
import React, { Suspense, useState } from "react";
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
// Redux
import { Provider, ReactReduxContext } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

import Tools from "./Interface/Tools";

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
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Suspense>
        <CanvasWrapper>
          <Provider store={store}>
            {console.log(store)}
            <InterfaceWrapper>
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
                      <Controls />
                      <ambientLight intensity={0.5} />
                      <Background />
                      <Sun />
                      <Dirt store={store} />
                      <Trees store={store} />
                      <Ocean />
                      <SodaCans
                        magnetActive={activeTool === "magnet" ? true : false}
                      />
                    </Suspense>
                  </Canvas>
                )}
              </ReactReduxContext.Consumer>
            </InterfaceWrapper>
          </Provider>
        </CanvasWrapper>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
