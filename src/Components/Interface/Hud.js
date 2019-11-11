import React, { useEffect } from "react";
import styled from "styled-components";
import treeImage from "../../assets/icons/treeScore.png";
import trashImage from "../../assets/icons/trashScore.png";
import { connect } from "react-redux";
import { fetchPlanetEnd } from "../../actions";

import { ReactComponent as HappyIcon } from "../../assets/icons/happy.svg";
import { ReactComponent as HappierIcon } from "../../assets/icons/happier.svg";
import { ReactComponent as AngryIcon } from "../../assets/icons/angry.svg";
import { ReactComponent as IndifferentIcon } from "../../assets/icons/indifferent.svg";

const HappySvg = styled(HappyIcon)`
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;

const HappierSvg = styled(HappierIcon)`
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;
const IndifferentSvg = styled(IndifferentIcon)`
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;
const AngrySvg = styled(AngryIcon)`
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;

const StyledDiv = styled.div`
  position: absolute;
  z-index: 100;
  transform: ${props =>
    props.inView === "inView" ? "translate(0,0)" : "translate(0,-300px)"};
  transition: 0.55s;
  color: white;
`;

const IconDiv = styled.div`
  position: absolute;
  display: flex;
  width: 125px;
  height: 90px;
  flex-direction: row;
  align-items: center;
  left: ${props => props.left};
  top: ${props => props.top};

  img {
    height: 60px;
    width: 60px;
    background-color: hotpink;
    border-radius: 50px;
  }
  h2 {
    margin-left: 5px;
  }
`;

const Hud = ({ zoomedOut, trees, cans, planet_end, fetchPlanetEnd }) => {
  useEffect(() => {
    fetchPlanetEnd();
  }, [fetchPlanetEnd]);
  const date = new Date(planet_end);

  const returnTreeSvg = () => {
    switch (true) {
      case trees === null:
        return <AngrySvg />;
      case trees.length < 5:
        return <IndifferentSvg />;
      case trees.length < 15:
        return <HappySvg />;
      case trees.length < 1000:
        return <HappierSvg />;
      default:
        return null;
    }
  };

  const returnTrashSvg = () => {
    const canslength = cans.filter(can => can !== "was removed").length;
    switch (true) {
      case cans === null:
        return <HappierSvg />;
      case canslength < 5:
        return <HappySvg />;
      case canslength < 15:
        return <IndifferentSvg />;
      case canslength < 1000:
        return <AngrySvg />;
      default:
        return null;
    }
  };

  console.log("Hej");
  return (
    <StyledDiv inView={zoomedOut ? "inView" : null}>
      <IconDiv left={"5vw"} top={"20vh"}>
        <img src={treeImage} alt="" />
        {returnTreeSvg()}
      </IconDiv>
      <IconDiv left={"15vw"} top={"5vh"}>
        <img src={trashImage} alt="" />
        {returnTrashSvg()}
      </IconDiv>
      <IconDiv left={"80vw"} top={"5vh"}>
        <h2>{date.toDateString()}</h2>
      </IconDiv>
    </StyledDiv>
  );
};

const mapStateToProps = ({ state: { zoomedOut, trees, cans, planet_end } }) => {
  return {
    planet_end,
    zoomedOut,
    trees: trees ? Object.values(trees) : null,
    cans: Object.values(cans)
  };
};

export default connect(
  mapStateToProps,
  { fetchPlanetEnd }
)(Hud);
