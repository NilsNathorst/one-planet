import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 101;
  background-color: black;
  overflow: hidden;
  display: block;
  .simple-trans-main > div {
    cursor: pointer;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 800;
    font-size: 7em;
    will-change: transform, opacity;
    text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;

    h3 {
      position: absolute;
      bottom: 10%;
      right: 10%;
      font-size: 2em;
    }
  }
  h1 {
    font-size: 7em;
    z-index: 102;
    letter-spacing: 5px;
    position: fixed;
    left: 10%;
    top: 15%;
    color: white;
    font-weight: 800;
  }
`;

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: "black" }} />,
  ({ style }) => (
    <animated.div style={{ ...style, background: "#2191fb" }}></animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "forestgreen" }} />
  )
  // ({ style, fart }) => (
  //   <animated.div style={{ ...style, background: "black" }} onClick={fart}>
  //     start
  //   </animated.div>
  // )
];

const Start = () => {
  const [index, set] = useState(0);
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    setDisplay(!display);
  };
  console.log(display);
  const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translate3d(0,0,100%)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
  });
  return (
    <StyledDiv>
      <h1 className="main-header">
        <p>only</p>
        <p>one</p>
        <p>planet</p>
      </h1>
      <div className="simple-trans-main" onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];
          return <Page key={key} style={props} fart={handleClick} />;
        })}
      </div>
    </StyledDiv>
  );
};

export default Start;

// import React, { useState } from "react";
// import styled from "styled-components";
// import bg from "../../assets/images/starmap-milkyway.jpg";

// const testDiv = styled(animated.div)``

// const StyledDiv = styled.div`
//   display: ${props => (props.isVisible ? "flex" : "none")};
//   position: absolute;
//   z-index: 101;
//   /* height: 100%;
//   width: 100%; */
//   /* background-image: url(${bg});
//   background-repeat: no-repeat;
//   background-size: cover; */
//   .view {
//     height: 100vh;
//     width: 100vh;
//     background-image: url(${bg});
//     background-repeat: no-repeat;
//     background-size: cover;
//   }
//   h1 {
//     color: white;
//   }
// `;

// const Start = () => {
//   const [display, setDisplay] = useState(true);
//   return (
//     <StyledDiv isVisible={display}>
//       <div className="view view-one">
//         <h1>first</h1>
//       </div>
//       <div className="view view-two">
//         <h1>second</h1>
//       </div>
//       <div className="view view-three">
//         <h1>third</h1>
//       </div>
//       <h1 onClick={() => setDisplay(!display)}>Start</h1>
//     </StyledDiv>
//   );
// };

// export default Start;
