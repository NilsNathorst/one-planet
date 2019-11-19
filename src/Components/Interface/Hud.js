import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchPlanet } from "../../actions";
import treeImage from "../../assets/icons/treeScore.png";
import trashImage from "../../assets/icons/trashScore.png";
import Tooltip from "./Tooltip";
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
    fill: ${props => props.fillcolor};
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
    @media screen and (min-width: 1940px) {
      svg {
        height: 120px;
        width: 120px;
      }
      .thermometer {
        height: 120px;
        width: 120px;
      }
    }

    @media screen and (max-width: 700px) {
      svg {
        height: 40px;
        width: 40px;
      }
      .thermometer {
        height: 60px;
        width: 60px;
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
    border-radius: 50px;
  }
  @media screen and (max-width: 700px) {
    img {
      height: 40px;
      width: 40px;
    }
  }

  @media screen and (min-width: 1940px) {
    width: 240px;
    img {
      height: 120px;
      width: 120px;
    }
  }
`;

const Hud = ({ zoomedOut, trees, cans, planetEnd, fetchPlanet }) => {
  const [showTreeTooltip, setShowTreeTooltip] = useState(false);
  const [showTrashTooltip, setShowTrashTooltip] = useState(false);
  const [showPlanetTooltip, setShowPlanetTooltip] = useState(false);
  const [tempColor, setTempColor] = useState("");
  const cansLength = cans
    ? cans.filter(can => can !== "was removed").length
    : 0;
  const treesLength = trees
    ? trees.filter(tree => tree !== "was removed").length
    : 0;
  useEffect(() => {
    fetchPlanet();
  }, [fetchPlanet]);
  useEffect(() => {
    if (cansLength > 10 || (trees && treesLength < 10)) {
      setTempColor("red");
    } else {
      setTempColor("green");
    }
  }, [cansLength, treesLength]);
  const returnTreeSvg = () => {
    switch (true) {
      case treesLength > 30:
        return <HappierSvg />;
      case treesLength > 20:
        return <HappySvg />;
      case treesLength > 10:
        return <IndifferentSvg />;
      case treesLength < 5:
        return <AngrySvg />;
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
      case cansLength < 20:
        return <IndifferentSvg />;
      case cansLength > 30:
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
            <IconDiv>
              <img
                src={treeImage}
                alt=""
                onMouseOver={() => {
                  setShowTreeTooltip(!showTreeTooltip);
                }}
                onMouseOut={() => {
                  setShowTreeTooltip(!showTreeTooltip);
                }}
              />
              {returnTreeSvg()}
              <Tooltip visible={showTreeTooltip} left={"60%"} top={"100%"} hud>
                <p>
                  There are currently {trees ? treesLength : "no"}{" "}
                  {treesLength === 1 ? "tree" : "trees"} on the planet.{" "}
                  {treesLength < 15 &&
                    `Plant  ${15 - treesLength} more trees to make me happy`}
                </p>
              </Tooltip>
            </IconDiv>
            <IconDiv>
              <img
                src={trashImage}
                alt=""
                onMouseOver={() => {
                  setShowTrashTooltip(!showTrashTooltip);
                }}
                onMouseOut={() => {
                  setShowTrashTooltip(!showTrashTooltip);
                }}
              />
              {returnTrashSvg()}
              <Tooltip visible={showTrashTooltip} left={"65%"} top={"100%"} hud>
                <p>
                  There are currently {cans ? cansLength : "no"} cans in the
                  ocean.
                </p>
              </Tooltip>
            </IconDiv>
          </div>
          <IconDiv>
            <ThermometerSvg
              fillcolor={tempColor}
              className="thermometer"
              onMouseOver={() => {
                setShowPlanetTooltip(!showPlanetTooltip);
              }}
              onMouseOut={() => {
                setShowPlanetTooltip(!showPlanetTooltip);
              }}
            />
            <Tooltip
              className="planet-tooltip"
              visible={showPlanetTooltip}
              left={"-45px"}
              top={"0"}
              arrowRight
            >
              <p>
                The planet ends on {new Date(planetEnd).toLocaleDateString()}
              </p>
            </Tooltip>
          </IconDiv>
        </div>
      </StyledDiv>
    </>
  );
};

const mapStateToProps = ({ state: { zoomedOut, trees, cans, planet } }) => {
  return {
    planetEnd: planet.planetEnd,
    zoomedOut,
    trees: trees ? Object.values(trees) : null,
    cans: cans ? Object.values(cans) : null
  };
};

export default connect(mapStateToProps, { fetchPlanet })(Hud);
