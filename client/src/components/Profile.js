import React, { Component } from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
import Player from './Player';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
// import Recommendations from './Recommendations';

import styled from 'styled-components/macro';

import { getRecommendations, getPlaylists } from '../spotify';

const Container = styled.div`
  padding: 75px;
  padding-left: 200px;
`;

class Profile extends Component {
  state = {
    playlists: null,
    recommendations: null,
  };

  componentDidMount() {
    getPlaylists().then(res => {
      this.setState({
        playlists: res.data,
      });
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
    const { recommendations, playlists } = this.state;

    const UserRoute = () => <User />;
    const RecentRoute = () => <RecentlyPlayed />;
    const ArtistsRoute = () => <TopArtists />;
    const TracksRoute = () => <TopTracks />;
    const PlaylistsRoute = () => <div>{playlists && <Playlists playlists={playlists} />}</div>;
    // const RecommendationsRoute = () => (
    //   <div>{recommendations && <Recommendations recommendations={recommendations} />}</div>
    // );

    return (
      <Container>
        <Sidebar />

        <Router>
          <UserRoute path="/" />
          <RecentRoute path="/recent" />
          <ArtistsRoute path="/artists" />
          <TracksRoute path="/tracks" />
          <PlaylistsRoute path="/playlists" />
          {/* <RecommendationsRoute path="/recommendations" /> */}
        </Router>

        <Player />
      </Container>
    );
  }
}

export default Profile;
