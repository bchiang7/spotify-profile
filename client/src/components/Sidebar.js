import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import { theme } from '../styles';

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #040306;
  text-align: center;

  a {
    display: block;
    padding: ${theme.spacing.base};
  }
`;
const Logo = styled.div`
  font-size: 50px;
  margin-top: 20px;
`;
const Menu = styled.ul`
  margin-top: 50px;
`;
const MenuItem = styled.li`
  font-size: 12px;
  color: ${theme.colors.grey};

  a {
    &:hover,
    &:focus,
    &.active {
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
    }
  }

  i {
    font-size: 30px;
    margin-bottom: 10px;
  }

  span {
    display: block;
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
    <Menu>
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
        <NavLink to="recommendations">
          <i className="far fa-heart" />
          <span>Recs</span>
        </NavLink>
      </MenuItem>
    </Menu>
  </Container>
);

export default Sidebar;
