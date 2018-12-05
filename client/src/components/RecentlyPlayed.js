import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRecentlyPlayed } from '../spotify';

import Loader from './Loader';
import Track from './Track';

import styled from 'styled-components/macro';
import { Section } from '../styles';

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

class RecentlyPlayed extends Component {
  static propTypes = {
    recentlyPlayed: PropTypes.object,
  };

  state = {
    recentlyPlayed: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { data } = await getRecentlyPlayed();
      this.setState({ recentlyPlayed: data });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <Section>
        <h2>Recently Played Tracks</h2>
        <TracksContainer>
          {recentlyPlayed ? (
            recentlyPlayed.items.map(({ track }, i) => <Track track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </TracksContainer>
      </Section>
    );
  }
}

export default RecentlyPlayed;
