import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
`;

const TreeTool = () => {
  const [myState, setmyState] = useState(null);

  useEffect(() => {
    console.log("mounted");
  }, []);
  const handleClick = () => {};
  return (
    <StyledDiv onClick={() => handleClick()}>
      <h1>TreeTool</h1>
    </StyledDiv>
  );
};

export default TreeTool;
