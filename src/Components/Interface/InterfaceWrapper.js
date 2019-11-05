import React from "react";
import styled from "styled-components";
import plantIcon from "../../assets/icons/s-plantable.png";
import noPlantIcon from "../../assets/icons/s-notPlantable.png";
import { connect } from "react-redux";

const Wrapper = styled.div`
  position: absolute;
  cursor: ${props =>
    props.activeTool === "TREE" && props.hovering
      ? props.plantable
        ? `url(${plantIcon}), grab`
        : `url(${noPlantIcon}), pointer`
      : "default"};
  height: 100vh;
  width: 100vw;
`;

const InterfaceWrapper = ({ name, hoverActive, plantable, children }) => {
  return (
    <Wrapper
      className="wrapper"
      activeTool={name}
      hovering={hoverActive}
      plantable={plantable}
    >
      {children}
    </Wrapper>
  );
};

const mapStateToProps = ({ state: { name, hoverActive, plantable } }) => {
  return {
    name,
    hoverActive,
    plantable
  };
};

export default connect(mapStateToProps)(InterfaceWrapper);
