import React, { Component } from 'react';
import Head from './Head';
import User from './User';

import styled from 'styled-components';
import { theme, Header, A } from '../style';

const StyledApp = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  height: 100%;
  padding: ${theme.spacing.xl};
`;
const StyledHeader = Header.extend`
  height: 150px;
  padding: 20px;
`;
const StyledTitle = styled.h1`
  font-size: 1.5em;
`;

const LoginButton = A.extend`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 18px 48px 16px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;

class App extends Component {
  state = {
    token: null,
    user: null,
    topArtists: null,
    topTracks: null,
  };

  componentDidMount() {
    const params = this.getHashParams();
    const access_token = params.access_token;

    if (params.error) {
      alert('There was an error during the authentication');
    }

    if (!access_token) {
      return;
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          token: access_token,
          user: data,
        })
      )
      .catch(error => console.error(`Fetch Error =\n`, error));

    setTimeout(() => {
      this.getTopArtists();
    }, 500);
  }

  getTopArtists() {
    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          topArtists: data,
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    const { user, topArtists } = this.state;
    console.log(topArtists);

    return (
      <StyledApp>
        <Head />
        {user ? (
          <User user={user} />
        ) : (
          <LoginButton href="http://localhost:8888/login">
            Sign in to Spotify
          </LoginButton>
        )}
      </StyledApp>
    );
  }
}

export default App;
