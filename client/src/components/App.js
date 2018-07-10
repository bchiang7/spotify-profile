import React, { Component } from 'react';
import axios from 'axios';
import { test } from '../spotify';

import Head from './Head';
import User from './User';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Recommendations from './Recommendations';
import Playlists from './Playlists';

import styled from 'styled-components';
import { theme, mixins, A } from '../style';

const StyledApp = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  height: 100%;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
  border-top: 1rem solid ${theme.colors.green};
`;
const Login = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 75vh;
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
const Profile = styled.div``;
const TopItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.spacing.xl};
`;

class App extends Component {
  state = {
    token: null,
    user: null,
    topArtists: null,
    topTracks: null,
    playlists: null,
    recommendations: null,
  };

  componentDidMount() {
    const params = this.getHashParams();

    if (params.error) {
      alert('There was an error during the authentication');
    }

    if (!params.access_token) {
      return;
    }

    this.setState({ token: params.access_token });

    // test();
  }

  componentDidUpdate() {
    const { user, topArtists, topTracks, playlists, recommendations } = this.state;

    if (!user) {
      this.getUser();
    }

    if (!topArtists) {
      this.getTopArtists();
    }

    if (!topTracks) {
      this.getTopTracks();
    }

    if (!playlists) {
      this.getPlaylists();
    }

    if (!recommendations) {
      this.getRecommendations();
    }
  }

  getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getUser() {
    axios
      .get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then(response => {
        // console.log(response);
        this.setState({ user: response.data });
      })
      .catch(error => console.error(error));
  }

  getTopArtists() {
    axios
      .get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then(response => {
        this.setState({ topArtists: response.data });
      })
      .catch(error => console.error(error));
  }

  getTopTracks() {
    axios
      .get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then(response => {
        this.setState({ topTracks: response.data });
      })
      .catch(error => console.error(error));
  }

  getRecommendations() {
    // console.log(this.state.topTracks);
    const { topTracks } = this.state;

    if (!topTracks) {
      return;
    }

    // get IDs of first 3 artists in topTracks
    const seed_artists = topTracks.items
      .slice(0, 3)
      .map(track => track.artists[0].id)
      .join(',');

    // get IDS of 4th and 5th topTracks
    const seed_tracks = topTracks.items
      .slice(3, 5)
      .map(track => track.id)
      .join(',');

    const url = `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then(response => {
        // console.log(response);
        this.setState({ recommendations: response.data });
      })
      .catch(error => console.error(error));
  }

  getPlaylists() {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then(response => {
        // console.log(response);
        this.setState({ playlists: response.data });
        // this.getTracks();
      })
      .catch(error => console.error(error));
  }

  // TODO: get audio features for playlists

  render() {
    const { user, topArtists, topTracks, recommendations, playlists } = this.state;

    return (
      <StyledApp>
        <Head />
        {user ? (
          <Profile>
            <User user={user} />
            <TopItems>
              {topArtists && <TopArtists topArtists={topArtists} />}
              {topTracks && <TopTracks topTracks={topTracks} />}
            </TopItems>
            {recommendations && <Recommendations recommendations={recommendations} />}
            {playlists && <Playlists playlists={playlists} />}
          </Profile>
        ) : (
          <Login>
            <h1>Your Spotify Profile</h1>
            <LoginButton href="http://localhost:8888/login">Log in to Spotify</LoginButton>
          </Login>
        )}
      </StyledApp>
    );
  }
}

export default App;
