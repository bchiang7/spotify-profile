import React, { Component } from 'react';

import styled from 'styled-components';
import { theme, Img, Header } from '../style';

const Container = Header.extend`
  display: flex;
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
  letter-spacing: 2px;
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
      </Container>
    );
  }
}

export default User;
