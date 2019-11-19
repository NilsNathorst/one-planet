import React, { useState, useEffect } from "react";
import { animated, config, useSpring } from "react-spring";
import infoData from "../../database/infoData.json";

import { ReactComponent as TrashIcon } from "../../assets/icons/info/drinks.svg";
import { ReactComponent as TreeIcon } from "../../assets/icons/info/forest.svg";

import styled from "styled-components";
import { connect } from "react-redux";
const Container = styled(animated.div)`
  display: flex;
  transform: translateX(-50%);
  left: 50%;
  position: absolute;
  bottom: 0;
  z-index: 100;
  pointer-events: none;
  background: white;
  border-radius: 8px;
  color: black;
  min-width: 300px;
  width: 20%;

  fill: #888888;
  padding: 1em;
  p {
    margin-top: auto;
    margin-bottom: auto;
    white-space: pre-line;
    padding-left: 1em;
  }
  div {
    min-width: 20%;
    max-width: 20%;
  }
`;

const StyledTrashIcon = styled(TrashIcon)`
  width: 100%;
  height: 100%;
`;
const StyledTreeIcon = styled(TreeIcon)`
  width: 100%;
  height: 100%;
`;
const InfoBubble = ({ object, infoActive }) => {
  const props = useSpring({
    marginBottom: infoActive ? 60 : -60,
    opacity: infoActive ? 1 : 0,
    config: config.stiff
  });

  const [prevObj, setPrev] = useState({});

  useEffect(() => {
    object && setPrev(object);
  }, [object]);
  return (
    <Container style={props} className="info">
      <div className="div">
        {prevObj.objType === "trash" && <StyledTrashIcon />}
        {prevObj.objType === "tree" && <StyledTreeIcon />}
      </div>
      <animated.p>
        {prevObj.objType === "trash" &&
          (infoData[prevObj.name]
            ? `${
                infoData.trashFacts[
                  Math.floor(Math.random() * infoData.treeFacts.length)
                ]
              }`
            : null)}
        {prevObj.objType === "tree" &&
          (infoData[prevObj.name]
            ? `${
                infoData.treeFacts[
                  Math.floor(Math.random() * infoData.treeFacts.length)
                ]
              }`
            : null)}
      </animated.p>
    </Container>
  );
};

const mapStateToProps = ({
  state: {
    showInfo: { active: infoActive, object }
  }
}) => {
  return {
    infoActive,
    object
  };
};
export default connect(mapStateToProps)(InfoBubble);
