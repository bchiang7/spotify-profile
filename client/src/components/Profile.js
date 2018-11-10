import React, { Component } from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
import Player from './Player';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Recommendations from './Recommendations';
// import Playlists from './Playlists';

import styled from 'styled-components/macro';
import { theme } from '../styles';

import { getUser, getEverything, getRecommendations } from '../spotify';

const Container = styled.div`
  padding: ${theme.spacing.xl};
  padding-left: 200px;
`;

class Profile extends Component {
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
    getUser().then(res => {
      this.setState(
        {
          user: res.user,
        },
        () => {
          // TODO: don't call everything at once now that there's routing
          getEverything().then(res => {
            this.setState({
              user: res.user,
              followedArtists: res.followedArtists,
              recentlyPlayed: res.recentlyPlayed,
              topArtists: res.topArtists,
              topTracks: res.topTracks,
              playlists: res.playlists,
            });
          });
        },
      );
    });
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

    getRecommendations(topTracks, res => {
      this.setState({ recommendations: res });
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

    const UserRoute = () => (
      <div>
        {user && (
          <User user={user} followedArtists={followedArtists} totalPlaylists={totalPlaylists} />
        )}
      </div>
    );
    const RecentRoute = () => (
      <div>{recentlyPlayed && <RecentlyPlayed recentlyPlayed={recentlyPlayed} />}</div>
    );
    const ArtistsRoute = () => <div>{topArtists && <TopArtists topArtists={topArtists} />}</div>;
    const TracksRoute = () => <div>{topTracks && <TopTracks topTracks={topTracks} />}</div>;
    const RecommendationsRoute = () => (
      <div>{recommendations && <Recommendations recommendations={recommendations} />}</div>
    );

    return (
      <Container>
        <Sidebar />

        <Router>
          <UserRoute path="/" />
          <RecentRoute path="/recent" />
          <ArtistsRoute path="/artists" />
          <TracksRoute path="/tracks" />
          <RecommendationsRoute path="/recommendations" />
        </Router>

        <Player />

        {/* {playlists && <Playlists playlists={playlists} />} */}
      </Container>
    );
  }
}

export default Profile;
