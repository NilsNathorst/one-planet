import React from "react";
import styled from "styled-components";
import treeImage from "../../assets/icons/treeScore.png";
import { connect } from "react-redux";

const StyledDiv = styled.div`
  position: absolute;
  z-index: 100;
  transform: ${props =>
    props.inView === "inView" ? "translate(0,0)" : "translate(0,-100px)"};
  transition: 0.55s;
  color: white;
`;

const TreeDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: 5vw;
  top: 5vh;

  img {
    height: 50px;
    width: 50px;
    background-color: hotpink;
    border-radius: 50px;
  }
`;

const Hud = ({ ui, data }) => {
  return (
    <StyledDiv inView={ui.zoomedOut ? "inView" : null}>
      {/* <h1>Day the world ends: {new Date().toString()}</h1> */}
      <TreeDiv>
        <img src={treeImage} alt="" />
        <h2>{data.length}</h2>
      </TreeDiv>
    </StyledDiv>
  );
};

const mapStateToProps = ({ ui, data }) => {
  return {
    ui,
    data: Object.values(data)
  };
};

export default connect(mapStateToProps)(Hud);
