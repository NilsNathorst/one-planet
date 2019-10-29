import React, { useEffect } from "react";
import styled from "styled-components";
import plantIcon from "../../assets/icons/s-plantable.png";
import noPlantIcon from "../../assets/icons/s-notPlantable.png";
import { connect } from "react-redux";
const Wrapper = styled.div`
  position: absolute;
  cursor: ${props =>
    props.activeTool == "TREE" && props.hovering
      ? props.plantable
        ? `url(${plantIcon}), grab`
        : `url(${noPlantIcon}), pointer`
      : "default"};
  height: 100vh;
  width: 100vw;
`;
const InterfaceWrapper = props => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Wrapper
      className="wrapper"
      {...props}
      activeTool={props.state.name}
      hovering={props.state.hoverActive}
      plantable={props.state.plantable}
    />
  );
};

const mapStateToProps = ({ data, state }) => {
  return {
    data,
    state
  };
};

export default connect(mapStateToProps)(InterfaceWrapper);
