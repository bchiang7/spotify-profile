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
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 12px 22px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;
const Preview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
`;
const Tracklist = styled.div`
  h2 {
    margin-bottom: 30px;
  }
`;
const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h2 {
    display: inline-block;
    margin: 0;
  }
`;
const MoreButton = styled(Link)`
  color: ${colors.lightestGrey};
  border: 1px solid ${colors.lightestGrey};
  border-radius: 30px;
  padding: 12px 22px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover,
  &:focus {
    color: ${colors.white};
    border: 1px solid ${colors.white};
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

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { user, followedArtists, playlists, recentlyPlayed, topTracks } = await getUserInfo();
      this.setState({ user, followedArtists, playlists, recentlyPlayed, topTracks });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { user, followedArtists, playlists, recentlyPlayed, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;
    // console.log(topTracks);

    return (
      <React.Fragment>
        {user ? (
          <Container>
            {/* <LogoutButton href="https://accounts.spotify.com">Logout</LogoutButton> */}

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

            <Preview>
              <Tracklist>
                <TracklistHeading>
                  <h2>Recently Played</h2>
                  <MoreButton to="/recent">See More</MoreButton>
                </TracklistHeading>
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
                <TracklistHeading>
                  <h2>Top Tracks</h2>
                  <MoreButton to="/tracks">See More</MoreButton>
                </TracklistHeading>
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
