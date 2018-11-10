import React from 'react';
import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.nav`
  ${mixins.flexBetween};
  background-color: ${theme.colors.darkGrey};
  position: fixed;
  width: 100%;
  height: ${theme.playerHeight};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  min-width: 620px;
  border-top: 1px solid #000;
  padding: 16px;
`;
const PlayerLeft = styled.div``;
const PlayerCenter = styled.div`
  ${mixins.flexCenter};
  width: ${theme.playerControlsWidth};
  max-width: ${theme.playerControlsWidth};
  height: 100%;
  outline: 1px solid grey;
`;
const PlayerRight = styled.div``;

const Player = () => (
  <Container>
    <PlayerLeft>PlayerLeft</PlayerLeft>
    <PlayerCenter>PlayerCenter</PlayerCenter>
    <PlayerRight>PlayerRight</PlayerRight>
  </Container>
);

export default Player;
