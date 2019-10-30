import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const StyledDiv = styled.div`
  position: absolute;
  z-index: 100;
  transform: ${props =>
    props.inView === "inView" ? "translate(0,0)" : "translate(0,-100px)"};
  transition: 0.55s;
  width: 100%;
  height: 60px;
  background: blue;
`;

const Hud = ({ ui }) => {
  return (
    <StyledDiv inView={ui.zoomedOut ? "inView" : null}>
      <h1>Day the world ends: {new Date().toString()}</h1>
    </StyledDiv>
  );
};

const mapStateToProps = ({ ui }) => {
  return {
    ui
  };
};

export default connect(mapStateToProps)(Hud);
