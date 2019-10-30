import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bg from "../../assets/images/starmap-milkyway.jpg";
const StyledDiv = styled.div`
  display: ${props => (props.display ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 101;
  height: 100vh;
  width: 100vw;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: contain;
  h1 {
    color: white;
  }
`;

const Start = () => {
  const [display, setDisplay] = useState(true);
  return (
    <StyledDiv display={display}>
      <h1 onClick={() => setDisplay(!display)}>Start</h1>
    </StyledDiv>
  );
};

export default Start;
