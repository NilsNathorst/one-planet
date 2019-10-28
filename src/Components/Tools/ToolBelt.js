import React, { useContext } from "react";
import styled from "styled-components";
import { ToolContext } from "./ToolContext";
const StyledDiv = styled.div`
  display: flex;
  z-index: 100;
`;
const ToolBelt = () => {
  const { setActiveTool } = useContext(ToolContext);
  return (
    <StyledDiv>
      <ul>
        <li>
          <h1 onClick={e => setActiveTool("magnet")}>Magnet</h1>
        </li>
        <li>
          <h1 onClick={e => setActiveTool("seed")}>Seed</h1>
        </li>
      </ul>
    </StyledDiv>
  );
};

export default ToolBelt;
