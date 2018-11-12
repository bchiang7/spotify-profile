import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUserInfo } from '../spotify';

import { IconUser } from './icons';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

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
  padding: ${theme.spacing.md};
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
`;
const Stats = styled.div`
  ${mixins.flexBetween};
  margin-top: ${theme.spacing.base};
  text-align: center;
`;
const Stat = styled.div`
  margin: 0 ${theme.spacing.base};
`;
const Number = styled.div`
  color: ${theme.colors.green};
  font-weight: 700;
  font-size: ${theme.fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.xs};
`;
// const LogoutButton = styled.a`
//   position: absolute;
//   top: 50px;
//   right: 50px;
//   background-color: ${theme.colors.green};
//   color: ${theme.colors.white};
//   border-radius: 30px;
//   padding: 12px 22px;
//   font-size: ${theme.fontSizes.xs};
//   font-weight: 700;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   text-align: center;
//   &:hover {
//     background-color: ${theme.colors.offGreen};
//   }
// `;

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
  };

  static propTypes = {
    user: PropTypes.object,
    followedArtists: PropTypes.object,
    totalPlaylists: PropTypes.number,
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

    console.log(user);

    return (
      <React.Fragment>
        {user && (
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
            <Name>{user.display_name}</Name>
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
                  <Number>{totalPlaylists}</Number>
                  <NumLabel>Playlists</NumLabel>
                </Stat>
              )}
            </Stats>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default User;
