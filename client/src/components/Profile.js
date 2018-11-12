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
import { theme } from '../styles';

import { getRecommendations } from '../spotify';

const Container = styled.div`
  padding: 75px 75px 165px 200px;
`;

class Profile extends Component {
  state = {
    recommendations: null,
  };

  componentDidMount() {}

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

    getRecommendations(topTracks, res => this.setState({ recommendations: res }));
  }

  render() {
    const { recommendations } = this.state;

    // const RecommendationsRoute = () => (
    //   <div>{recommendations && <Recommendations recommendations={recommendations} />}</div>
    // );

    return (
      <Container>
        <Sidebar />

        <Router>
          <User path="/" />
          <RecentlyPlayed path="/recent" />
          <TopArtists path="/artists" />
          <TopTracks path="/tracks" />
          <Playlists path="/playlists" />
          {/* <RecommendationsRoute path="/recommendations" /> */}
        </Router>

        <Player />
      </Container>
    );
  }
}

export default Profile;
