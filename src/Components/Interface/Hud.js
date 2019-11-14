import React, { useEffect, useState } from "react";
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
    .icon-container {
      display: flex;
    }
    @media screen and (max-width: 700px) {
      svg {
        height: 40px;
        width: 40px;
      }
      .thermometer {
        height: 80px;
        width: 80px;
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
  .tooltip {
    visibility: ${props => (props.visible ? "visible" : "hidden")};
    width: 140px;
    background-color: white;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    position: absolute;
    color: black;
    z-index: 1;
    top: 100%;
    left: ${props => props.left};
    margin-left: -60px;
    ::before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid white;
      left: 15px;
      top: -7px;
    }
  }
  .planet-tooltip {
    top: 0;
    left: -45px;
    ::before {
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid white;
      border-right: none;
      left: 139px;
      top: 8px;
    }
  }

  img {
    height: 60px;
    width: 60px;
    background-color: hotpink;
    border-radius: 50px;
  }
  @media screen and (max-width: 700px) {
    img {
      height: 40px;
      width: 40px;
    }
  }
`;

const Hud = ({ zoomedOut, trees, cans, planetEnd, fetchPlanetEnd }) => {
  const [treeToolTip, setTreeToolTip] = useState(false);
  const [trashToolTip, setTrashToolTip] = useState(false);
  const [planetToolTip, setPlanetToolTip] = useState(false);
  const cansLength = cans
    ? cans.filter(can => can !== "was removed").length
    : 0;
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
    switch (true) {
      case cansLength < 5:
        return <HappierSvg />;
      case cansLength < 10:
        return <HappySvg />;
      case cansLength < 15:
        return <IndifferentSvg />;
      case cansLength < 1000:
        return <AngrySvg />;
      default:
        return null;
    }
  };

  return (
    <>
      <StyledDiv inview={zoomedOut ? "inView" : null}>
        <div className="flexbox">
          <div className="icon-container">
            <IconDiv visible={treeToolTip} left={"60%"}>
              <img
                src={treeImage}
                alt=""
                onMouseOver={() => {
                  setTreeToolTip(!treeToolTip);
                }}
                onMouseOut={() => {
                  setTreeToolTip(!treeToolTip);
                }}
              />
              {returnTreeSvg()}
              <span className="tooltip">
                There are currently {trees ? trees.length : "no"}{" "}
                {trees.length === 1 ? "tree" : "trees"} on the planet.{" "}
                {trees.length < 15 &&
                  `Plant  ${15 - trees.length} more trees to make me happy`}
              </span>
            </IconDiv>
            <IconDiv visible={trashToolTip} left={"65%"}>
              <img
                src={trashImage}
                alt=""
                onMouseOver={() => {
                  setTrashToolTip(!trashToolTip);
                }}
                onMouseOut={() => {
                  setTrashToolTip(!trashToolTip);
                }}
              />
              {returnTrashSvg()}
              <span className="tooltip">
                There are currently {cans ? cansLength : "no"} cans in the
                ocean.
              </span>
            </IconDiv>
          </div>
          <IconDiv visible={planetToolTip} left={"100%"}>
            <ThermometerSvg
              color={
                (cans && cansLength > 10) ||
                (trees && trees.length < 10 ? "red" : "green")
              }
              className="thermometer"
              onMouseOver={() => {
                setPlanetToolTip(!planetToolTip);
              }}
              onMouseOut={() => {
                setPlanetToolTip(!planetToolTip);
              }}
            />
            <span className="tooltip planet-tooltip">
              The planet ends on {new Date(planetEnd).toLocaleDateString()}
            </span>
          </IconDiv>
        </div>
      </StyledDiv>
    </>
  );
};

const mapStateToProps = ({ state: { zoomedOut, trees, cans, planetEnd } }) => {
  return {
    planetEnd,
    zoomedOut,
    trees: trees ? Object.values(trees) : null,
    cans: cans ? Object.values(cans) : null
  };
};

export default connect(mapStateToProps, { fetchPlanetEnd })(Hud);
