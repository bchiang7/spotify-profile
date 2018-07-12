import React, { Component } from 'react';
import { getUser, getTopArtists, getTopTracks, getPlaylists, getRecommendations } from '../spotify';

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
    user: null,
    topArtists: null,
    topTracks: null,
    playlists: null,
    recommendations: null,
  };

  componentDidMount() {
    getUser(response => this.setState({ user: response }));
    getTopArtists(response => this.setState({ topArtists: response }));
    getTopTracks(response => this.setState({ topTracks: response }));
    getPlaylists(response => this.setState({ playlists: response }));
  }

  componentDidUpdate() {
    if (!this.state.recommendations) {
      this.getRecommendations();
    }
  }

  getRecommendations() {
    const { topTracks } = this.state;

    if (!topTracks) {
      return;
    }

    getRecommendations(topTracks, response => {
      this.setState({ recommendations: response });
    });
  }

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
