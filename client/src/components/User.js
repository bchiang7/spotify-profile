import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, Img, Header, A, P } from '../style';

const Container = Header.extend`
  display: flex;
  position: relative;
  margin-bottom: ${theme.spacing.xl};
`;
const Avatar = Img.extend`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-right: ${theme.spacing.xl};
`;
const MetaData = styled.div``;
const Label = styled.div`
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;
const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
`;
const Stats = styled.div`
  ${mixins.flexBetween};
  margin-top: ${theme.spacing.base};
`;
const Stat = styled.div``;
const Number = styled.div`
  color: ${theme.colors.green};
  font-weight: 700;
  font-size: ${theme.fontSizes.md};
`;
const NumLabel = P.extend`
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.xs};
`;
const LogoutButton = A.extend`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 12px 22px;
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;

class User extends Component {
  render() {
    const { user, followedArtists, totalPlaylists } = this.props;

    return (
      <Container>
        <Avatar src={user.images[0].url} />
        <MetaData>
          <Label>{user.type}</Label>
          <Name>{user.display_name}</Name>
          <Stats>
            <Stat>
              <Number>{user.followers.total}</Number>
              <NumLabel>Followers</NumLabel>
            </Stat>
            <Stat>
              <Number>{followedArtists.artists.items.length}</Number>
              <NumLabel>Following</NumLabel>
            </Stat>
            <Stat>
              <Number>{totalPlaylists}</Number>
              <NumLabel>Playlists</NumLabel>
            </Stat>
          </Stats>
        </MetaData>
        <LogoutButton href="http://localhost:3000">Log Out</LogoutButton>
      </Container>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  followedArtists: PropTypes.object,
  totalPlaylists: PropTypes.number,
};

export default User;
