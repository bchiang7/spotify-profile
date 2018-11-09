import React from 'react';
import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.nav`
  ${mixins.flexBetween};
  background-color: ${theme.colors.darkGrey};
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  min-width: 620px;
  border-top: 1px solid #000;
  padding: 20px;
`;
const PlayerLeft = styled.div``;
const PlayerCenter = styled.div``;
const PlayerRight = styled.div``;

const Player = () => (
  <Container>
    <PlayerLeft> PlayerLeft</PlayerLeft>
    <PlayerCenter> PlayerCenter</PlayerCenter>
    <PlayerRight> PlayerRight</PlayerRight>
  </Container>
);

export default Player;
