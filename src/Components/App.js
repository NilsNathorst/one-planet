import React, { useEffect, useState } from "react";
import GlobalStyles from "../Styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { database } from "../database/firebase";
import Theme from "../Styles/Theme";
import Scene from "./Scene";
const App = () => {
  const [rocks, setRocks] = useState({});
  useEffect(() => {
    database.ref("/").on("value", snapshot => {
      setRocks(snapshot.val().rocks);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Scene rocks={rocks} />
      </ThemeProvider>
    </>
  );
};

export default App;
