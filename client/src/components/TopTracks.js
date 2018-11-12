import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../spotify';

import Track from './Track';

import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';

const Container = styled(Section)``;
const Header = styled.header`
  ${mixins.flexBetween};
  h2 {
    margin-bottom: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
`;
const RangeButton = styled.button`
  background-color: transparent;
  font-size: ${theme.fontSizes.base};
  color: ${props => (props.isActive ? theme.colors.white : theme.colors.lightGrey)};
  span {
    padding-bottom: 3px;
    border-bottom: 1px solid ${props => (props.isActive ? theme.colors.white : `transparent`)};
  }
`;
const TracksContainer = styled.div`
  margin-top: 50px;
`;

class TopTracks extends Component {
  state = {
    topTracks: null,
    activeRange: '',
  };

  static propTypes = {
    topTracks: PropTypes.object,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getTopTracksLong().then(res => {
      if (this._isMounted) {
        this.setState({ topTracks: res.data, activeRange: 'long' });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ topTracks: null });
  }

  setActiveRange = range => {
    if (range === 'long') {
      getTopTracksLong().then(res => {
        this.setState({ topTracks: res.data, activeRange: range });
      });
    } else if (range === 'medium') {
      getTopTracksMedium().then(res => {
        this.setState({ topTracks: res.data, activeRange: range });
      });
    } else if (range === 'short') {
      getTopTracksShort().then(res => {
        this.setState({ topTracks: res.data, activeRange: range });
      });
    }
  };

  render() {
    const { topTracks, activeRange } = this.state;

    return (
      <Container>
        <Header>
          <h2>Top Tracks</h2>
          <Ranges>
            <RangeButton
              isActive={activeRange === 'long'}
              onClick={() => this.setActiveRange('long')}>
              <span>All Time</span>
            </RangeButton>
            <RangeButton
              isActive={activeRange === 'medium'}
              onClick={() => this.setActiveRange('medium')}>
              <span>Last 6 Months</span>
            </RangeButton>
            <RangeButton
              isActive={activeRange === 'short'}
              onClick={() => this.setActiveRange('short')}>
              <span>Last 4 Weeks</span>
            </RangeButton>
          </Ranges>
        </Header>
        <TracksContainer>
          {topTracks && topTracks.items.map((track, i) => <Track track={track} key={i} />)}
        </TracksContainer>
      </Container>
    );
  }
}

export default TopTracks;
