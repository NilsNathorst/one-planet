import React, { useCallback } from "react";
import styled from "styled-components";
import magnet from "../../assets/icons/magnetIcon.png";
import forest from "../../assets/icons/forestIcon.png";
import query from "../../assets/icons/queryIcon.png";
import { connect, useDispatch } from "react-redux";
import { fetchLastPlanted } from "../../actions/index";

const StyledDiv = styled.div`
  transition: 0.55s;
  display: flex;
  height: 100%;
  bottom: 0;
  justify-content: center;
  transform: ${props =>
    props.inView === "inView" ? "translate(-100px,0)" : "translate(0,0)"};
  flex-direction: column;
  position: absolute;
  z-index: 100;

  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    bottom: 0;
    height: 60px;
    transform: ${props =>
      props.inView === "inView" ? "translate(0,100px)" : "translate(0,0)"};
  }
`;
const ToolIcon = styled.div`
  transition: 0.25s;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  align-self: center;
  margin: 1rem;
  @media screen and (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
  &:hover {
    border: solid 2px white;
  }
  opacity: ${props => (props.active ? 1 : 0.7)};
`;

const Tools = ({ name, zoomedOut, last_planted }) => {
  const dispatch = useDispatch();
  const setTool = useCallback(
    value => dispatch({ type: "SET_TOOL", payload: value }),
    [dispatch]
  );

  return (
    <StyledDiv inView={zoomedOut ? "inView" : null}>
      <ToolIcon
        icon={forest}
        active={name === "TREE" ? true : false}
        onClick={() => {
          fetchLastPlanted();
          if (
            (name !== "TREE" && Date.now() - last_planted > 1000 * 60) ||
            (name !== "TREE" && last_planted === null)
          ) {
            setTool("TREE");
          } else if (name === "TREE") {
            setTool("NONE");
          }
        }}
      />

      <ToolIcon
        icon={magnet}
        active={name === "MAGNET" ? true : false}
        onClick={() => {
          if (name !== "MAGNET") {
            setTool("MAGNET");
          } else if (name === "MAGNET") {
            setTool("NONE");
          }
        }}
      />
      <ToolIcon
        icon={query}
        active={name === "QUERY" ? true : false}
        onClick={() => {
          if (name !== "QUERY") {
            setTool("QUERY");
          } else if (name === "QUERY") {
            setTool("NONE");
          }
        }}
      />
    </StyledDiv>
  );
};

const mapStateToProps = ({ state: { name, zoomedOut, last_planted } }) => {
  return {
    name,
    zoomedOut,
    last_planted
  };
};
export default connect(
  mapStateToProps,
  { fetchLastPlanted }
)(Tools);
