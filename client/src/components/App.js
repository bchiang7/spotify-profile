import React, { Component } from 'react';
import { token } from '../spotify';

import Head from './Head';
import LoginScreen from './LoginScreen';
import Profile from './Profile';

import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class App extends Component {
  state = {
    token: '',
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;

    return (
      <AppContainer>
        <Head />

        <GlobalStyle />

        {token ? <Profile /> : <LoginScreen />}
      </AppContainer>
    );
  }
}

export default App;
