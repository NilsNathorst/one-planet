import React, { useState, useEffect } from "react";
import styled from "styled-components";
import magnet from "../../assets/icons/magnetIcon.png";
import forest from "../../assets/icons/forestIcon.png";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

const StyledDiv = styled.div`
  display: flex;
  height: 100%;
  bottom: 0;
  justify-content: center;

  flex-direction: column;
  position: absolute;
  z-index: 100;

  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    bottom: 0;
    height: 60px;
  }
`;
const ToolIcon = styled.div`
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
`;

const Tools = props => {
  return (
    <StyledDiv>
      <ToolIcon
        icon={forest}
        onClick={() => {
          props.actions.setTool("TREE");
        }}
      />
      <ToolIcon
        icon={magnet}
        onClick={() => {
          props.actions.setTool("MAGNET");
        }}
      />
    </StyledDiv>
  );
};

const mapStateToProps = ({ data, state }) => {
  return {
    data,
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
