import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRecentlyPlayed } from '../spotify';

import Loader from './Loader';
import Track from './Track';

import styled from 'styled-components/macro';
import { theme, Section } from '../styles';
const { spacing } = theme;

const Container = styled(Section)`
  width: 100%;
  margin-bottom: ${spacing.xl};
`;
const TracksContainer = styled.div`
  margin-top: 50px;
`;

class RecentlyPlayed extends Component {
  static propTypes = {
    recentlyPlayed: PropTypes.object,
  };

  state = {
    recentlyPlayed: null,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getRecentlyPlayed().then(res => {
      if (this._isMounted) {
        this.setState({ recentlyPlayed: res.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ recentlyPlayed: null });
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <Container>
        <h2>Recently Played Tracks</h2>
        <TracksContainer>
          {recentlyPlayed ? (
            recentlyPlayed.items.map(({ track }, i) => <Track track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </TracksContainer>
      </Container>
    );
  }
}

export default RecentlyPlayed;
