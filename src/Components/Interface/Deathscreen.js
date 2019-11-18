import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchPlanet } from "../../actions";

const StyledDeathscreen = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0px 2px 4px black;
  z-index: 10;
  pointer-events: none;
  div {
    text-align: center;
  }
`;

const Deathscreen = ({ planet, fetchPlanet }) => {
  useEffect(() => {
    fetchPlanet();
  }, []);
  return (
    <StyledDeathscreen>
      {planet.planetEnd && (
        <div>
          <h1>
            The planet survived for{" "}
            {Math.floor(
              (planet.planetEnd - planet.planetStart) / 1000 / 60 / 60 / 24
            )}{" "}
            days
          </h1>
          <h2>{planet.treesAdded} trees were planted</h2>
          <h2>
            {planet.cansRemoved} pieces of trash were removed from the ocean
          </h2>
        </div>
      )}
    </StyledDeathscreen>
  );
};
const mapStateToProps = ({ state: { planet } }) => {
  return {
    planet
  };
};

export default connect(mapStateToProps, { fetchPlanet })(Deathscreen);
