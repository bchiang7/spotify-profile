import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUserInfo } from '../spotify';

import { IconUser } from './icons';
import Loader from './Loader';
import Track from './Track';

import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';
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
// const LogoutButton = styled.a`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background-color: ${colors.green};
//   color: ${colors.white};
//   border-radius: 30px;
//   padding: 12px 22px;
//   font-size: ${fontSizes.xs};
//   font-weight: 700;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   &:hover,
//   &:focus {
//     background-color: ${colors.offGreen};
//   }
// `;
const Preview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
`;
const Tracklist = styled.div``;
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
`;
const ArtistList = styled.ul``;
const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};
`;
const ArtistArtwork = styled.img`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  height: 50px;
  margin-right: ${spacing.base};
  border-radius: 100%;
`;
const ArtistName = styled.span`
  flex-grow: 1;
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
            </Header>

            <Preview>
              <Tracklist>
                <TracklistHeading>
                  <h3>Top Artists of All Time</h3>
                  <MoreButton to="/artists">See More</MoreButton>
                </TracklistHeading>
                <div>
                  {topArtists ? (
                    <ArtistList>
                      {topArtists.items.slice(0, 10).map((artist, i) => (
                        <Artist key={i}>
                          {artist.images.length && (
                            <ArtistArtwork src={artist.images[2].url} alt="Artist" />
                          )}
                          <ArtistName>{artist.name}</ArtistName>
                        </Artist>
                      ))}
                    </ArtistList>
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
                    topTracks.items.slice(0, 10).map((track, i) => <Track track={track} key={i} />)
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
