import React from "react";
import GlobalStyles from "../Styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

import Theme from "../Styles/Theme";
import Scene from "./Scene";
const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Scene />
      </ThemeProvider>
    </>
  );
};

export default App;
