import React from 'react';
import { Link } from '@reach/router';

import {
  IconSpotify,
  IconUser,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic,
  IconGithub,
} from './icons';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors, spacing } = theme;

const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.sidebarWidth};
  background-color: ${colors.sidebarBlack};
  text-align: center;
  z-index: 99;
  a {
    display: block;
    padding: ${spacing.sm};
  }
  & > * {
    width: 100%;
  }
`;
const Logo = styled.div`
  color: ${colors.green};
  margin-top: 20px;
  width: 70px;
  transition: ${theme.transition};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const MenuItem = styled.li`
  width: 100%;
  color: ${colors.lightGrey};
  font-size: 11px;
  a {
    padding: 15px;
    border-left: 5px solid transparent;
    &:hover,
    &:focus,
    &.active {
      color: ${colors.white};
      background-color: ${colors.black};
      border-left: 5px solid ${colors.offGreen};
    }
  }
  svg {
    width: 25px;
    margin-bottom: 8px;
  }
`;

const Github = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  margin-bottom: 30px;
  a {
    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue};
    }
  }
`;

const isActive = ({ isCurrent }) => (isCurrent ? { className: 'active' } : null);

const NavLink = props => <Link getProps={isActive} {...props} />;

const Sidebar = () => (
  <Container>
    <Logo>
      <Link to="/">
        <IconSpotify />
      </Link>
    </Logo>
    <ul>
      <MenuItem>
        <NavLink to="/">
          <IconUser />
          <div>Profile</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="artists">
          <IconMicrophone />
          <div>Top Artists</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="tracks">
          <IconMusic />
          <div>Top Tracks</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="recent">
          <IconTime />
          <div>Recent</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="playlists">
          <IconPlaylist />
          <div>Playlists</div>
        </NavLink>
      </MenuItem>
    </ul>
    <Github>
      <a
        href="https://github.com/bchiang7/spotify-profile"
        target="_blank"
        rel="noopener noreferrer">
        <IconGithub />
      </a>
    </Github>
  </Container>
);

export default Sidebar;
