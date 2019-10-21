import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  background-color: ${props => (props.isActive ? "green" : "red")};
`;

const TreeTool = props => {
  const [myState, setmyState] = useState(null);

  useEffect(() => {
    console.log("mounted");
  }, []);
  return (
    <StyledDiv {...props} onClick={props.onClick}>
      <h1>TreeTool</h1>
    </StyledDiv>
  );
};

export default TreeTool;
