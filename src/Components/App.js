// Dependencies
import React, { Suspense } from "react";
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
import InfoBubble from "./Interface/InfoBubble";
import ThoughtBubble from "./Interface/ThoughtBubble";
import CanvasWrapper from "./Interface/CanvasWrapper";

// Redux
import { Provider } from "react-redux";

import { setPlanetDead, fetchLastPlanted } from "../actions/index";

const App = ({ store }) => {
  store.dispatch(setPlanetDead());
  store.dispatch(fetchLastPlanted());

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <CanvasWrapper>
        <InterfaceWrapper>
          <Hud />
          <Tools />
          <InfoBubble />
          <ThoughtBubble />
          <Canvas
            camera={{ position: [0, 0, 200] }}
            onCreated={({ gl, scene, camera }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
              gl.compile(scene, camera);
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
                <Surface
                  type="sand"
                  treeUrl="/models/trees/palm/palm.glb"
                  modelUrl="/models/planet/final/sand.glb"
                  textureUrls={[
                    "/assets/textures/Sand/Vol_16_2_Base_Color.png",
                    "/assets/textures/Sand/Vol_16_2_Height.png",
                    "/assets/textures/Sand/Vol_16_2_Normal.png",
                    "/assets/textures/Sand/Vol_16_2_Ambient_Occlusion.png"
                  ]}
                />
                <Surface
                  type="snow"
                  treeUrl="/models/trees/pine/pine.glb"
                  modelUrl="/models/planet/final/snow.glb"
                  textureUrls={[
                    "/assets/textures/Snow/Vol_22_4_Base_Color.png",
                    "/assets/textures/Snow/Vol_22_4_Height.png",
                    "/assets/textures/Snow/Vol_22_4_Normal.png",
                    "/assets/textures/Snow/Vol_22_4_Ambient_Occlusion.png"
                  ]}
                />
                <Surface
                  type="grass"
                  treeUrl="/models/trees/tree/tree.glb"
                  modelUrl="/models/planet/final/grass.glb"
                  textureUrls={[
                    "/assets/textures/Grass/Vol_42_1_Base_Color.png",
                    "/assets/textures/Grass/Vol_42_1_Height.png",
                    "/assets/textures/Grass/Vol_42_1_Normal.png",
                    "/assets/textures/Grass/Vol_42_1_Ambient_Occlusion.png"
                  ]}
                />
                <Trees />
                <Ocean />
                <SodaCans />
                <Fx />
              </Provider>
            </Suspense>
          </Canvas>
        </InterfaceWrapper>
      </CanvasWrapper>
    </ThemeProvider>
  );
};

export default App;
