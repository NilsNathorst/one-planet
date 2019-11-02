import React from "react";
import styled from "styled-components";
import magnet from "../../assets/icons/magnetIcon.png";
import forest from "../../assets/icons/forestIcon.png";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

const StyledDiv = styled.div`
  transition: 0.55s;
  display: flex;
  height: 100%;
  bottom: 0;
  justify-content: center;
  transform: ${props =>
    props.inView === "inView" ? "translate(-100px,0)" : "translate(0,0)"};
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

const ToolIcon = styled.div`
  transition: 0.25s;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  align-self: center;
  margin: 1rem;
  @media screen and (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
  &:hover {
    border: solid 2px white;
  }
  opacity: ${props => (props.active ? 1 : 0.7)};
`;

const Tools = ({ actions, ui, state }) => {
  return (
    <StyledDiv inView={ui.zoomedOut ? "inView" : null}>
      <ToolIcon
        icon={forest}
        active={state.name === "TREE" ? true : false}
        onClick={() => {
          if (state.name !== "TREE") {
            actions.setTool("TREE");
          } else if (state.name === "TREE") {
            actions.setTool("NONE");
          }
        }}
      />
      <ToolIcon
        icon={magnet}
        active={state.name === "MAGNET" ? true : false}
        onClick={() => {
          if (state.name !== "MAGNET") {
            actions.setTool("MAGNET");
          } else if (state.name === "MAGNET") {
            actions.setTool("NONE");
          }
        }}
      />
    </StyledDiv>
  );
};

const mapStateToProps = ({ ui, state }) => {
  return {
    ui,
    state
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tools);
