import React from 'react';
import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';

require('dotenv').config();
const LOGIN_URI =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' : process.env.LOGIN_URI;

const Login = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;

const LoginScreen = () => (
  <Login>
    <h1>{process.env.NODE_ENV}</h1>
    <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
  </Login>
);

export default LoginScreen;
