import React, { useCallback } from "react";
import styled from "styled-components";
import magnet from "../../assets/icons/magnetIcon.png";
import forest from "../../assets/icons/forestIcon.png";
import { connect, useDispatch } from "react-redux";

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

const Tools = props => {
  const dispatch = useDispatch();

  const setTool = useCallback(
    value => dispatch({ type: "SET_TOOL", payload: value }),
    [dispatch]
  );

  return (
    <StyledDiv inView={props.state.zoomedOut ? "inView" : null}>
      <ToolIcon
        icon={forest}
        active={props.state.name === "TREE" ? true : false}
        onClick={() => {
          if (props.state.name !== "TREE") {
            setTool("TREE");
          } else if (props.state.name === "TREE") {
            setTool("NONE");
          }
        }}
      />
      <ToolIcon
        icon={magnet}
        active={props.state.name === "MAGNET" ? true : false}
        onClick={() => {
          if (props.state.name !== "MAGNET") {
            setTool("MAGNET");
          } else if (props.state.name === "MAGNET") {
            setTool("NONE");
          }
        }}
      />
    </StyledDiv>
  );
};

const mapStateToProps = ({ state }) => {
  return {
    state
  };
};

export default connect(mapStateToProps)(Tools);
