import React from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Recommendations from './Recommendations';
import Track from './Track';
import Artist from './Artist';

import styled from 'styled-components/macro';
import { media } from '../styles';

const Container = styled.div`
  padding: 0 100px 0 200px;
  ${media.tablet`
    padding: 50px 50px 90px;
  `};
  ${media.phablet`
    padding: 40px 20px 90px;
  `};
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
        <Track path="track/:trackId" />
        <Artist path="artist/:artistId" />
      </Router>
    </main>

    {/* <Player /> */}
  </Container>
);

export default Profile;
