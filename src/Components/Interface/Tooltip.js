import React from "react";
import styled, { css } from "styled-components";

const StyledSpan = styled.span`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
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
  ${props =>
      props.tool &&
      css`
        @media screen and (min-width: 1940px) {
          left: 140%;
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
  tool
}) => {
  return (
    <StyledSpan
      left={left}
      visible={visible}
      tool={tool}
      top={top}
      arrowRight={arrowRight}
      arrowLeft={arrowLeft}
    >
      {children}
    </StyledSpan>
  );
};

export default Tooltip;
