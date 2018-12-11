import React from 'react';
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
import ArtistInfo from './ArtistInfo';

import styled from 'styled-components/macro';

const Container = styled.div`
  padding: 0 100px 0 200px;
`;

const Profile = () => (
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
        <ArtistInfo path="artist/:artistId" />
      </Router>
    </main>

    {/* <Player /> */}
  </Container>
);

export default Profile;
