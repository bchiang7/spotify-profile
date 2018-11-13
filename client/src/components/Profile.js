import React, { Component } from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
import Player from './Player';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import PlaylistInfo from './PlaylistInfo';

import styled from 'styled-components/macro';

const Container = styled.div`
  padding: 75px 75px 165px 200px;
`;

class Profile extends Component {
  render() {
    return (
      <Container>
        <Sidebar />

        <Router>
          <User path="/" />
          <RecentlyPlayed path="recent" />
          <TopArtists path="artists" />
          <TopTracks path="tracks" />
          <Playlists path="playlists" />
          <PlaylistInfo path="playlists/:playlistId" />
        </Router>

        <Player />
      </Container>
    );
  }
}

export default Profile;
