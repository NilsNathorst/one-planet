import React from "react";
import styled from "styled-components";
import plantIcon from "../../assets/icons/s-plantable.png";
import noPlantIcon from "../../assets/icons/s-notPlantable.png";
import { connect } from "react-redux";

const Wrapper = styled.div`
  position: fixed !important;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: ${props =>
    props.activeTool === "TREE"
      ? props.plantable
        ? `url(${plantIcon}), grab`
        : `url(${noPlantIcon}), pointer`
      : "default"};
`;

const InterfaceWrapper = ({ name, plantable, children }) => {
  return (
    <Wrapper className="wrapper" activeTool={name} plantable={plantable}>
      {children}
    </Wrapper>
  );
};

const mapStateToProps = ({ state: { name, plantable } }) => {
  return {
    name,

    plantable
  };
};

export default connect(mapStateToProps)(InterfaceWrapper);
