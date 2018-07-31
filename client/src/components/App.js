import React, { Component } from 'react';
import { getEverything, getRecommendations } from '../spotify';

import Head from './Head';
import LoginScreen from './LoginScreen';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
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
    followedArtists: null,
    recentlyPlayed: null,
    topArtists: null,
    topTracks: null,
    playlists: null,
    recommendations: null,
  };

  componentDidMount() {
    getEverything().then(response => {
      this.setState({
        user: response.user,
        followedArtists: response.followedArtists,
        recentlyPlayed: response.recentlyPlayed,
        topArtists: response.topArtists,
        topTracks: response.topTracks,
        playlists: response.playlists,
      });
    });
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
    const {
      user,
      followedArtists,
      recentlyPlayed,
      topArtists,
      topTracks,
      recommendations,
      playlists,
    } = this.state;

    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <StyledApp>
        <Head />
        {user && followedArtists ? (
          <Profile>
            <User user={user} followedArtists={followedArtists} totalPlaylists={totalPlaylists} />
            {recentlyPlayed && <RecentlyPlayed recentlyPlayed={recentlyPlayed} />}
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
