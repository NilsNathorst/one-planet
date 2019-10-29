import React, { useContext } from "react";
import styled from "styled-components";
import { ToolContext } from "./ToolContext";
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 100;
  justify-content: space-around;
  color: white;

  h1 {
    border: solid white 2px;
    padding: 0.2rem 1rem;
    margin: 0.5rem;
  }
`;
const ToolBelt = () => {
  const { setActiveTool } = useContext(ToolContext);
  return (
    <StyledDiv>
      <h1 onClick={e => setActiveTool("magnet")}>Magnet</h1>

      <h1 onClick={e => setActiveTool("seed")}>Seed</h1>

      <h1 onClick={e => setActiveTool("none")}>None</h1>
    </StyledDiv>
  );
};

export default ToolBelt;
