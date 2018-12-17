import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUserInfo, logout } from '../spotify';

import { IconUser, IconInfo } from './icons';
import Loader from './Loader';
import TrackItem from './TrackItem';

import styled from 'styled-components/macro';
import { theme, mixins, media, Section } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
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
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: ${spacing.base};
  text-align: center;
`;
const Stat = styled.div``;
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
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;
const Preview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `};
`;
const Tracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;
const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
const MoreButton = styled(Link)`
  ${mixins.button};
  text-align: center;
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin-right: ${spacing.base};
    border-radius: 100%;
  }
`;

const ArtistName = styled(Link)`
  flex-grow: 1;
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
      this.setState({ user, followedArtists, playlists, topArtists, topTracks });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { user, followedArtists, playlists, topArtists, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <React.Fragment>
        {user ? (
          <Section>
            <Header>
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
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </Header>

            <Preview>
              <Tracklist>
                <TracklistHeading>
                  <h3>Top Artists of All Time</h3>
                  <MoreButton to="/artists">See More</MoreButton>
                </TracklistHeading>
                <div>
                  {topArtists ? (
                    <ul>
                      {topArtists.items.slice(0, 10).map((artist, i) => (
                        <Artist key={i}>
                          <ArtistArtwork to={`/artist/${artist.id}`}>
                            {artist.images.length && (
                              <img src={artist.images[2].url} alt="Artist" />
                            )}
                            <Mask>
                              <IconInfo />
                            </Mask>
                          </ArtistArtwork>
                          <ArtistName to={`/artist/${artist.id}`}>
                            <span>{artist.name}</span>
                          </ArtistName>
                        </Artist>
                      ))}
                    </ul>
                  ) : (
                    <Loader />
                  )}
                </div>
              </Tracklist>

              <Tracklist>
                <TracklistHeading>
                  <h3>Top Tracks of All Time</h3>
                  <MoreButton to="/tracks">See More</MoreButton>
                </TracklistHeading>
                <ul>
                  {topTracks ? (
                    topTracks.items
                      .slice(0, 10)
                      .map((track, i) => <TrackItem track={track} key={i} />)
                  ) : (
                    <Loader />
                  )}
                </ul>
              </Tracklist>
            </Preview>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default User;
