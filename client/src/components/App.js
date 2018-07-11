import React, { Component } from 'react';
import axios from 'axios';

import { token, getUser } from '../spotify';

import Head from './Head';
import LoginScreen from './LoginScreen';
import User from './User';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Recommendations from './Recommendations';
import Playlists from './Playlists';

import styled from 'styled-components';
import { theme, mixins } from '../style';

const StyledApp = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  height: 100%;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
  border-top: 1rem solid ${theme.colors.green};
`;
const Profile = styled.div``;
const TopItems = styled.div`
  ${mixins.flexBetween};
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
    this.setState({ token: token });
  }

  componentDidUpdate() {
    const { user, topArtists, topTracks, playlists, recommendations } = this.state;

    if (!user) {
      this.getUser();
    } else {
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

  getAccessToken() {
    const params = this.getHashParams();

    if (params.error) {
      alert('There was an error during authentication');
    }

    if (!params.access_token) {
      return;
    }

    return params.access_token;
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
          <LoginScreen />
        )}
      </StyledApp>
    );
  }
}

export default App;
