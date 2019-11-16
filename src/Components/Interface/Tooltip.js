import React from "react";
import styled, { css } from "styled-components";

const StyledSpan = styled.span`
  opacity: ${props => (props.visible ? "1" : "0")};
  transition: 0.3s;
  min-width: 140px;
  width: 10%;
  background-color: white;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  color: black;
  z-index: 1;
  top: ${props => props.top};
  left: ${props => props.left};
  margin-left: -60px;
  font-size: 1rem;

  @media screen and (min-width: 2500px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 1940px) {
    font-size: 1.5rem;
  }
  ${props =>
    props.tool &&
    css`
      @media screen and (min-width: 1940px) {
        left: 140%;
      }
    `}
  ${props =>
    props.hud &&
    css`
      @media screen and (min-width: 1940px) {
        top: 145%;
        left: 42%;
      }
    `}
  ::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
    left: 15px;
    top: -7px;
    position: absolute;
    ${props =>
      props.arrowRight &&
      css`
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid white;
        border-right: none;
        left: 139px;
        top: 8px;
      `};
    ${props =>
      props.arrowLeft &&
      css`
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid white;
        border-left: none;
        left: -7px;
        top: 7px;
      `};
  }
`;

const Tooltip = ({
  visible,
  left,
  top,
  children,
  arrowRight,
  arrowLeft,
  tool,
  hud
}) => {
  return (
    <StyledSpan
      left={left}
      visible={visible}
      tool={tool}
      hud={hud}
      top={top}
      arrowRight={arrowRight}
      arrowLeft={arrowLeft}
    >
      {children}
    </StyledSpan>
  );
};

export default Tooltip;
