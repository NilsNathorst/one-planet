import React, { useState } from "react";
import styled from "styled-components";
import { animated, config, useSpring } from "react-spring";

import trees from "../../assets/images/IntroModalTrees.png";
import trash from "../../assets/images/IntroModalTrash.png";
const ModalWrapper = styled(animated.div)`
  display: ${props => (props.open ? "flex" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 8px;
  width: 40%;
  min-width: 340px;
  height: 70%;
  background-color: white;
  padding: 3rem 2rem;

  h1 {
    transition: 0.25s ease-in-out;
    align-self: center;
    padding: 0.5rem 1rem;
    border: solid #202020 2px;
  }
  h1:hover {
    color: white;
    background: #202020;
    transform: scaleX(1.2) scaleY(1.1);

    border: solid #202020 2px;
  }
`;

const StyledImg = styled.div`
  width: 50%;
  max-height: 50%;
  min-height: 10%;
  margin-left: auto;
  margin-right: auto;
  background-image: url(${props => props.imgSrc});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
`;
const IntroModal = () => {
  const [isOpen, set] = useState(true);
  const props = useSpring({
    marginTop: 0,
    opacity: 1,
    from: { opacity: 0, marginTop: -1000 },
    config: config.wobbly
  });
  const click = () => {
    set(false);
  };
  return (
    <ModalWrapper style={props} open={isOpen} onClick={() => click()}>
      <ModalInfo onClick={e => e.stopPropagation()}>
        <div className="intro">
          <h2>Welcome to Only One Planet,</h2>
          <p>
            This website will only exist for as long as you take care of it.
            Whenever you plant a tree or remove an old can from the ocean you
            add to the lifespan of the planet! If enough people make an effort
            the planet stays healthy.
          </p>
        </div>

        <StyledImg imgSrc={trees} />
        <p>
          Select the tree tool and plant some trees, remember to water them when
          the water droplet appears above otherwise they won't grow.
        </p>

        <StyledImg imgSrc={trash} />
        <p>
          Every once in a while trash pops up in the ocean, if there's too much
          of it the planet slowly dies. Select the trash magnet tool to help
          keep the ocean clean.
        </p>
        <h1 onClick={() => click()}>Get Started</h1>
      </ModalInfo>
    </ModalWrapper>
  );
};

export default IntroModal;
