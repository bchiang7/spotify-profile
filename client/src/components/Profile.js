import React, { Component } from 'react';

import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Recommendations from './Recommendations';
import Playlists from './Playlists';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

import { getUser, getEverything, getRecommendations } from '../spotify';

const Container = styled.div`
  padding: ${theme.spacing.xl};
`;
const TopItems = styled.div`
  ${mixins.flexBetween};
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

    return (
      <Container>
        {user && (
          <User user={user} followedArtists={followedArtists} totalPlaylists={totalPlaylists} />
        )}
        {recentlyPlayed && <RecentlyPlayed recentlyPlayed={recentlyPlayed} />}
        <TopItems>
          {topArtists && <TopArtists topArtists={topArtists} />}
          {topTracks && <TopTracks topTracks={topTracks} />}
        </TopItems>
        {recommendations && <Recommendations recommendations={recommendations} />}
        {playlists && <Playlists playlists={playlists} />}
      </Container>
    );
  }
}

export default Profile;
