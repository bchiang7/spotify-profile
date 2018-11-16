import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.nav`
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.sidebarWidth};
  background-color: ${theme.colors.sidebarBlack};
  text-align: center;
  a {
    display: block;
    padding: ${theme.spacing.sm};
  }
  & > * {
    width: 100%;
  }
`;
const Logo = styled.div`
  font-size: 50px;
  margin-top: 20px;
  color: ${theme.colors.green};
`;
const MenuItem = styled.li`
  width: 100%;
  font-size: 11px;
  color: ${theme.colors.lightGrey};
  a {
    border-left: 5px solid transparent;

    &:hover,
    &:focus,
    &.active {
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
      border-left: 5px solid ${theme.colors.offGreen};
    }
  }
  i {
    font-size: 25px;
    margin-bottom: 10px;
  }
  span {
    display: block;
  }
`;

const Info = styled.div`
  font-size: 22px;
  margin-bottom: 50px;
  color: ${theme.colors.lightGrey};
  a {
    &:hover,
    &:focus,
    &.active {
      color: ${theme.colors.white};
    }
  }
`;

const isActive = ({ isCurrent }) => (isCurrent ? { className: 'active' } : null);

const NavLink = props => <Link getProps={isActive} {...props} />;

const Sidebar = () => (
  <Container>
    <Logo>
      <Link to="/">
        <i className="fab fa-spotify" />
      </Link>
    </Logo>
    <ul>
      <MenuItem>
        <NavLink to="/">
          <i className="far fa-user" />
          <span>Profile</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="recent">
          <i className="far fa-clock" />
          <span>Recent</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="artists">
          <i className="far fa-star" />
          <span>Top Artists</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="tracks">
          <i className="far fa-heart" />
          <span>Top Tracks</span>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="playlists">
          <i className="fas fa-music" />
          <span>Playlists</span>
        </NavLink>
      </MenuItem>
      {/* <MenuItem>
        <NavLink to="recommendations">
          <i className="far fa-lightbulb" />
          <span>Recs</span>
        </NavLink>
      </MenuItem> */}
    </ul>
    <Info>
      <NavLink to="info">
        <i className="far fa-question-circle" />
      </NavLink>
    </Info>
  </Container>
);

export default Sidebar;
