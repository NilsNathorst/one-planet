import React, { useState, useEffect } from "react";
import magnet from "../../assets/icons/magnetNoBg.png";
import forest from "../../assets/icons/ForestNoBg.png";
import heart from "../../assets/icons/heartNoBg.png";
import forestAndMagnet from "../../assets/icons/ForestAndMagnetNoBg.png";
import { ReactComponent as ThoughtBubbleIcon } from "../../assets/icons/thoughtIcon.svg";
import styled from "styled-components";
import { connect } from "react-redux";
const Container = styled.div`
  display: flex;
  transform: translateX(-50%);
  transform: translateY(-50%);
  position: absolute;
  margin-left: ${props => (props.inview === "inView" ? "20px" : "60px")};
  left: 58%;
  top: 35%;
  bottom: 0;
  z-index: 100;
  pointer-events: none;
  transition: 0.55s;
  justify-content: center;
  opacity: ${props => (props.inview === "inView" ? 1 : 0)};
`;
const ThoughBubbleSvg = styled(ThoughtBubbleIcon)`
  opacity: 0.8;
  width: 15vw;
  fill: white;
  min-width: 150px;
`;

const ToolIcon = styled.div`
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  margin-left: 5%;
  margin-top: -5%;
  width: 100%;
  height: 80px;
  position: absolute;
  align-self: center;
  opacity: ${props => (props.inview === "inView" ? 1 : 0)} !important;
`;
const ThoughtBubble = ({ cans, trees, zoomedOut }) => {
  const [currentNeed, setCurrentNeed] = useState(null);
  useEffect(() => {
    if (cans < 10 && trees > 10) {
      setCurrentNeed(heart);
    }
    if (cans > 10) {
      setCurrentNeed(magnet);
    }
    if (trees < 10) {
      setCurrentNeed(forest);
    }
    if (trees < 10 && cans > 10) {
      setCurrentNeed(forestAndMagnet);
    }
  }, [cans, trees]);
  return (
    <Container inview={zoomedOut ? "inView" : null} className="info">
      <ThoughBubbleSvg inview={zoomedOut ? "inView" : null} />
      <ToolIcon inview={zoomedOut ? "inView" : null} icon={currentNeed} />
    </Container>
  );
};

const mapStateToProps = ({ state: { cans, trees, zoomedOut } }) => {
  return {
    cans: cans
      ? Object.values(cans).filter(can => can !== "was removed").length
      : 0,
    trees: trees ? Object.values(trees).length : 0,
    zoomedOut
  };
};
export default connect(mapStateToProps)(ThoughtBubble);
