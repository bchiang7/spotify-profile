import React from 'react';
import styled from 'styled-components/macro';
// import { theme } from '../styles';
// const { colors, spacing } = theme;

const Container = styled.nav``;

const Info = () => (
  <Container>
    <h1>Hey, thanks for stopping by!</h1>
    <p>
      This is a project by Brittany Chiang, made with React, Styled Components, Reach Router, and
      the Spotify Web API.
    </p>
    <p>Spotify Profile is meant to be a more in-depth look into your Spotify activity.</p>
    <p>Authorization Scopes used for this project are:</p>
    <ul>
      <li>user-read-private</li>
      <li>user-read-email</li>
      <li>user-read-playback-state</li>
      <li>user-read-recently-played</li>
      <li>user-top-read</li>
      <li>user-follow-read</li>
      <li>playlist-read-private</li>
      <li>playlist-read-collaborative</li>
    </ul>
    <br />
    <p>I logged in with wrong Spotify account!</p>
    <p>
      No worries, just go to <a href="https://accounts.spotify.com">accounts.spotify.com</a> to log
      out.
    </p>
    <p>Social Links here</p>
    <p>Check out the project on github</p>
  </Container>
);

export default Info;
