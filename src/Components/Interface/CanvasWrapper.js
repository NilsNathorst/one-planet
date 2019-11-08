import React from "react";

import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
`;

const CanvasWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default CanvasWrapper;
