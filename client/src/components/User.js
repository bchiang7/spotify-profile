import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUserInfo } from '../spotify';

import { IconUser } from './icons';
import Loader from './Loader';
import Track from './Track';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Container = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.a`
  &:hover {
    color: ${colors.offGreen};
  }
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: ${spacing.base};
  text-align: center;
`;
const Stat = styled.div`
  margin: 0 ${spacing.base};
`;
const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const LogoutButton = styled.a`
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 12px 22px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 20px;
  &:hover {
    background-color: ${colors.offGreen};
  }
`;
const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 100px;
`;
const Tracklist = styled.div`
  width: 45%;
  h2 {
    margin-bottom: 30px;
  }
`;

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    followedArtists: PropTypes.object,
    totalPlaylists: PropTypes.number,
  };

  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    recentlyPlayed: null,
    topTracks: null,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getUserInfo().then(({ user, followedArtists, playlists, recentlyPlayed, topTracks }) => {
      if (this._isMounted) {
        this.setState({ user, followedArtists, playlists, recentlyPlayed, topTracks });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ user: null, followedArtists: null, playlists: null });
  }

  render() {
    const { user, followedArtists, playlists, recentlyPlayed, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <React.Fragment>
        {user ? (
          <Container>
            <Avatar>
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
            </Avatar>
            <UserName href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <Name>{user.display_name}</Name>
            </UserName>
            <Stats>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>Followers</NumLabel>
              </Stat>

              {followedArtists && (
                <Stat>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
              )}

              {totalPlaylists && (
                <Stat>
                  <Link to="playlists">
                    <Number>{totalPlaylists}</Number>
                    <NumLabel>Playlists</NumLabel>
                  </Link>
                </Stat>
              )}
            </Stats>

            <LogoutButton href="https://accounts.spotify.com">Logout</LogoutButton>

            <Preview>
              <Tracklist>
                <h2>Recently Played</h2>
                <div>
                  {recentlyPlayed ? (
                    recentlyPlayed.items
                      .slice(0, 10)
                      .map(({ track }, i) => <Track track={track} key={i} />)
                  ) : (
                    <Loader />
                  )}
                </div>
              </Tracklist>
              <Tracklist>
                <h2>Top Tracks</h2>
                <div>
                  {topTracks ? (
                    topTracks.items.slice(0, 10).map((track, i) => <Track track={track} key={i} />)
                  ) : (
                    <Loader />
                  )}
                </div>
              </Tracklist>
            </Preview>
          </Container>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default User;
