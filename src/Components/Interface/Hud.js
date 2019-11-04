import React from "react";
import styled from "styled-components";
import treeImage from "../../assets/icons/treeScore.png";
import trashImage from "../../assets/icons/trashScore.png";
import { connect } from "react-redux";

const StyledDiv = styled.div`
  position: absolute;
  z-index: 100;
  transform: ${props =>
    props.inView === "inView" ? "translate(0,0)" : "translate(0,-100px)"};
  transition: 0.55s;
  color: white;
`;

const IconDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 80px;
  align-items: center;
  left: ${props => props.left};
  top: ${props => props.top};

  img {
    height: 50px;
    width: 50px;
    background-color: hotpink;
    border-radius: 50px;
  }
  h2 {
    margin-left: 5px;
  }
`;

const Hud = ({ ui, data, cans }) => {
  return (
    <StyledDiv inView={ui.zoomedOut ? "inView" : null}>
      {/* <h1>Day the world ends: {new Date().toString()}</h1> */}
      <IconDiv left={"5vw"} top={"5vh"}>
        <img src={treeImage} alt="" />
        <h2>{data.length}</h2>
      </IconDiv>
      <IconDiv left={"15vw"} top={"5vh"}>
        <img src={trashImage} alt="" />
        <h2>{cans.length}</h2>
      </IconDiv>
    </StyledDiv>
  );
};

const mapStateToProps = ({ ui, data, cans }) => {
  return {
    ui,
    data: Object.values(data),
    cans: Object.values(cans)
  };
};

export default connect(mapStateToProps)(Hud);
