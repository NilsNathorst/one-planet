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
import { ReactComponent as ThermometerIcon } from "../../assets/icons/thermometer.svg";

const HappySvg = styled(HappyIcon)`
  width: 100%;
  height: 100%;
  fill: white;
  padding-left: 10px;
`;
const ThermometerSvg = styled(ThermometerIcon)`
  width: 100px;
  height: 100px;
  padding-left: 10px;
  .fillPath {
    fill: ${props => props.color};
  }
`;
const HappierSvg = styled(HappierIcon)`
  width: 100%;
  height: 100%;
  fill: white;
  padding-left: 10px;
`;
const IndifferentSvg = styled(IndifferentIcon)`
  width: 100%;
  height: 100%;
  fill: white;
  padding-left: 10px;
`;
const AngrySvg = styled(AngryIcon)`
  width: 100%;
  height: 100%;
  fill: white;
  padding-left: 10px;
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 2vw 4vw;
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  z-index: 100;
  transform: ${props =>
    props.inview === "inView" ? "translate(0,0)" : "translate(0,-300px)"};
  transition: 0.55s;
  color: white;
  .flexbox {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 700px) {
      svg {
        height: 40px;
        width: 40px;
      }
    }
  }
`;

const IconDiv = styled.div`
  display: flex;
  width: 115px;
  height: 80px;
  flex-direction: row;
  align-items: center;
  margin: 10px;

  img {
    height: 60px;
    width: 60px;
    background-color: hotpink;
    border-radius: 50px;
  }
  h2 {
    margin-left: 5px;
  }
  @media screen and (max-width: 700px) {
    img {
      height: 40px;
      width: 40px;
    }
    .thermometer {
      height: 80px;
      width: 80px;
    }
  }
`;

const Hud = ({ zoomedOut, trees, cans, planet_end, fetchPlanetEnd }) => {
  useEffect(() => {
    fetchPlanetEnd();
  }, [fetchPlanetEnd]);

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
      case canslength < 5:
        return <HappierSvg />;
      case canslength < 10:
        return <HappySvg />;
      case canslength < 15:
        return <IndifferentSvg />;
      case canslength < 1000:
        return <AngrySvg />;
      default:
        return null;
    }
  };

  return (
    <StyledDiv inview={zoomedOut ? "inView" : null}>
      <div className="flexbox">
        <IconDiv>
          <img src={treeImage} alt="" />
          {returnTreeSvg()}
        </IconDiv>
        <IconDiv>
          <img src={trashImage} alt="" />
          {returnTrashSvg()}
        </IconDiv>
      </div>
      <IconDiv>
        <ThermometerSvg color="hotpink" className="thermometer" />
      </IconDiv>
    </StyledDiv>
  );
};

const mapStateToProps = ({ state: { zoomedOut, trees, cans, planet_end } }) => {
  return {
    planet_end,
    zoomedOut,
    trees: trees ? Object.values(trees) : null,
    cans: cans ? Object.values(cans) : null
  };
};

export default connect(
  mapStateToProps,
  { fetchPlanetEnd }
)(Hud);
