import React, { Component } from 'react';
import { theme, mixins, A, Section } from '../style';

const Login = Section.extend`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 75vh;
`;
const LoginButton = A.extend`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 18px 48px 16px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;

class LoginScreen extends Component {
  render() {
    return (
      <Login>
        <h1>Your Spotify Profile</h1>
        <LoginButton href="http://localhost:8888/login">Log in to Spotify</LoginButton>
      </Login>
    );
  }
}

export default LoginScreen;
