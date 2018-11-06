import React, { Component } from 'react';
import { getUser, getEverything, getRecommendations } from '../spotify';

import Head from './Head';
import LoginScreen from './LoginScreen';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Recommendations from './Recommendations';
import Playlists from './Playlists';

import styled from 'styled-components/macro';
import { mixins, GlobalStyle } from '../styles';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;
const Profile = styled.div``;
const TopItems = styled.div`
  ${mixins.flexBetween};
`;

class App extends Component {
  state = {
    loggedIn: false,
    user: null,
    followedArtists: null,
    recentlyPlayed: null,
    topArtists: null,
    topTracks: null,
    playlists: null,
    recommendations: null,
  };

  componentDidMount() {
    // getUser().then(response => {
    //   this.setState(
    //     {
    //       user: response.user,
    //     },
    //     () => {
    //       getEverything().then(response => {
    //         this.setState({
    //           user: response.user,
    //           followedArtists: response.followedArtists,
    //           recentlyPlayed: response.recentlyPlayed,
    //           topArtists: response.topArtists,
    //           topTracks: response.topTracks,
    //           playlists: response.playlists,
    //         });
    //       });
    //     },
    //   );
    // });
  }

  componentDidUpdate() {
    const { recommendations } = this.state;
    if (!recommendations) {
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
      loggedIn,
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
      <AppContainer>
        <Head />

        <GlobalStyle />

        {loggedIn ? (
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
      </AppContainer>
    );
  }
}

export default App;
