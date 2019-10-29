import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: white;
`;

const Start = () => {
  const [myState, setmyState] = useState(null);

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <StyledDiv>
      <h1>Start</h1>
    </StyledDiv>
  );
};

export default Start;
