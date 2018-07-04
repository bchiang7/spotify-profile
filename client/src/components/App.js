import React, { Component } from 'react';
import Head from './Head';

import styled from 'styled-components';
import { theme, Header, A } from '../style';

const StyledApp = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  height: 100%;
  text-align: center;
`;
const StyledHeader = Header.extend`
  height: 150px;
  padding: 20px;
`;
const StyledTitle = styled.h1`
  font-size: 1.5em;
`;

const StyledButton = A.extend`
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 18px 48px 16px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Head />
        <StyledHeader>
          <StyledTitle>Spotify Profile</StyledTitle>
        </StyledHeader>
        <StyledButton href="http://localhost:8888/login">
          Sign in to Spotify
        </StyledButton>
      </StyledApp>
    );
  }
}

export default App;
