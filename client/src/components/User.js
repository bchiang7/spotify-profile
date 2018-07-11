import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, Img, Header, A } from '../style';

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
  font-size: 50px;
  font-weight: 700;
  margin: 0;
`;
const Username = styled.h2`
  font-size: ${theme.fontSizes.sm};
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
    const { user } = this.props;
    // console.log(user);

    return (
      <Container>
        <Avatar src={user.images[0].url} />
        <MetaData>
          <Label>Spotify Profile</Label>
          <Name>{user.display_name}</Name>
          <Username>@{user.id}</Username>
        </MetaData>
        <LogoutButton href="http://localhost:3000">Log Out</LogoutButton>
      </Container>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
};

export default User;
