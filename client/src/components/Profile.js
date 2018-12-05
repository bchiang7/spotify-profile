import React, { Component } from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
// import Player from './Player';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Recommendations from './Recommendations';
import TrackInfo from './TrackInfo';
import Info from './Info';

import styled from 'styled-components/macro';

const Container = styled.div`
  padding: 0 100px 0 200px;
`;

class Profile extends Component {
  render() {
    return (
      <Container>
        <Sidebar />

        <main>
          <Router>
            <User path="/" />
            <RecentlyPlayed path="recent" />
            <TopArtists path="artists" />
            <TopTracks path="tracks" />
            <Playlists path="playlists" />
            <Playlist path="playlists/:playlistId" />
            <Recommendations path="recommendations/:playlistId" />
            <TrackInfo path="track/:trackId" />
            <Info path="info" />
          </Router>
        </main>

        {/* <Player /> */}
      </Container>
    );
  }
}

export default Profile;
