import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUserInfo } from '../spotify';

import { IconUser } from './icons';
import Loader from './Loader';

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
  ${mixins.flexBetween};
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
//   top: 50px;
//   right: 50px;
//   background-color: ${colors.green};
//   color: ${colors.white};
//   border-radius: 30px;
//   padding: 12px 22px;
//   font-size: ${fontSizes.xs};
//   font-weight: 700;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   text-align: center;
//   &:hover {
//     background-color: ${colors.offGreen};
//   }
// `;

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
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getUserInfo().then(({ user, followedArtists, playlists }) => {
      if (this._isMounted) {
        this.setState({ user, followedArtists, playlists });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ user: null, followedArtists: null, playlists: null });
  }

  render() {
    const { user, followedArtists, playlists } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;
    // console.log(user);

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

            {/* <div>{user.product}</div> */}

            {/* <div>{user.country}</div> */}
          </Container>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default User;
