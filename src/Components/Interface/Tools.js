import React, { useCallback, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import magnet from "../../assets/icons/magnetIcon.png";
import forest from "../../assets/icons/forestIcon.png";
import query from "../../assets/icons/queryIcon.png";
import { connect, useDispatch } from "react-redux";
import Tooltip from "./Tooltip";

const countdown = keyframes`
from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 180px;
  }
`;
const StyledDiv = styled.div`
  transition: 0.55s;
  display: flex;
  height: 100%;
  bottom: 0;
  justify-content: center;
  transform: ${props =>
    props.inView === "inView" ? "translate(-200px,0)" : "translate(0,0)"};
  flex-direction: column;
  position: absolute;
  z-index: 100;
  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    bottom: 0;
    height: 60px;
    transform: ${props =>
      props.inView === "inView" ? "translate(0,100px)" : "translate(0,0)"};
  }
`;
const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    flex-direction: row;
  }
`;
const ToolIcon = styled.div`
  svg {
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg) rotateZ(-90deg);
  }

  circle {
    stroke-dasharray: 180px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: ${props => (props.runAnim ? "4px" : "0px")};
    stroke: white;
    fill: none;
    animation: ${props =>
      props.runAnim &&
      css`
        ${countdown} 10s linear forwards
      `};
  }

  transition: 0.25s;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  align-self: center;
  margin: 1rem;

  @media screen and (min-width: 1940px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
  &:hover {
    border: solid 2px white;
  }
  opacity: ${props => (props.active ? 1 : 0.7)};
`;

const Tools = ({ name, zoomedOut, treeCooldown }) => {
  const [showTreeTooltip, setShowTreeTooltip] = useState(false);
  const [showMagnetTooltip, setShowMagnetTooltip] = useState(false);
  const [showQueryTooltip, setShowQueryTooltip] = useState(false);
  const dispatch = useDispatch();
  const setTool = useCallback(
    value => dispatch({ type: "SET_TOOL", payload: value }),
    [dispatch]
  );

  return (
    <StyledDiv inView={zoomedOut ? "inView" : null}>
      <ToolContainer>
        <div>
          <ToolIcon
            runAnim={treeCooldown}
            icon={forest}
            active={name === "TREE" ? true : false}
            onClick={() => {
              if (name !== "TREE") {
                setTool("TREE");
              } else if (name === "TREE") {
                setTool("NONE");
              }
            }}
            onMouseOver={() => {
              setShowTreeTooltip(!showTreeTooltip);
            }}
            onMouseOut={() => {
              setShowTreeTooltip(!showTreeTooltip);
            }}
          >
            <svg>
              <circle cx="50%" cy="50%" r="47%"></circle>
            </svg>
          </ToolIcon>
          <Tooltip
            visible={showTreeTooltip}
            left={"160%"}
            top={"32%"}
            arrowLeft
            tool
          >
            <p>Use the tree tool to plant new trees</p>
          </Tooltip>
        </div>
        <div>
          <ToolIcon
            icon={magnet}
            active={name === "MAGNET" ? true : false}
            onClick={() => {
              if (name !== "MAGNET") {
                setTool("MAGNET");
              } else if (name === "MAGNET") {
                setTool("NONE");
              }
            }}
            onMouseOver={() => {
              setShowMagnetTooltip(!showMagnetTooltip);
            }}
            onMouseOut={() => {
              setShowMagnetTooltip(!showMagnetTooltip);
            }}
          />
          <Tooltip
            visible={showMagnetTooltip}
            left={"160%"}
            top={"32%"}
            arrowLeft
            tool
          >
            <p>Use the trash magnet to remove cans</p>
          </Tooltip>
        </div>
        <div>
          <ToolIcon
            icon={query}
            active={name === "QUERY" ? true : false}
            onClick={() => {
              if (name !== "QUERY") {
                setTool("QUERY");
              } else if (name === "QUERY") {
                setTool("NONE");
              }
            }}
            onMouseOver={() => {
              setShowQueryTooltip(!showQueryTooltip);
            }}
            onMouseOut={() => {
              setShowQueryTooltip(!showQueryTooltip);
            }}
          />
          <Tooltip
            visible={showQueryTooltip}
            left={"160%"}
            top={"32%"}
            arrowLeft
            tool
          >
            <p>
              The query tool gives you information when you hover different
              elements on the planet
            </p>
          </Tooltip>
        </div>
      </ToolContainer>
    </StyledDiv>
  );
};

const mapStateToProps = ({ state: { name, zoomedOut, treeCooldown } }) => {
  return {
    name,
    zoomedOut,
    treeCooldown
  };
};
export default connect(mapStateToProps)(Tools);
