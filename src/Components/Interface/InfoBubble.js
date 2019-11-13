import React, { useState, useEffect } from "react";
import { animated, config, useSpring } from "react-spring";
import infoData from "../../database/infoData.json";
import { ReactComponent as PlaceholderIcon } from "../../assets/icons/help.svg";
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
  width: 300px;
  color: #888888;
  fill: #888888;
  padding: 10px;
  p {
    margin: auto;
    white-space: pre-line;
    padding-left: 10px;
  }
  div {
    margin: auto;
    min-width: 40px;
    max-width: 40px;
  }
`;
const Icon = styled(PlaceholderIcon)`
  width: 100%;
  height: 100%;
`;
const InfoBubble = ({ object, infoActive }) => {
  const props = useSpring({
    marginBottom: infoActive ? 50 : -50,
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
        <Icon />
      </div>

      <animated.p>
        {infoData[prevObj.name] ? infoData[prevObj.name].message : null}
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
