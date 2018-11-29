import React, { Component } from 'react';

import Head from './Head';
import LoginScreen from './LoginScreen';
import Profile from './Profile';

import { token, getNewToken } from '../spotify';

import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class App extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {
    if (token) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
      console.error('Something went wrong with the access token client side');
    }
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <AppContainer>
        <Head />

        <GlobalStyle />

        {loggedIn ? <Profile /> : <LoginScreen />}
      </AppContainer>
    );
  }
}

export default App;
