import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';

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
  color: ${props => (props.isActive ? theme.colors.white : theme.colors.lightestGrey)};

  span {
    padding-bottom: 3px;
    border-bottom: ${props =>
      props.isActive ? `1px solid ${theme.colors.white}` : `1px solid transparent`};
  }
`;
const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${theme.spacing.base};
  margin-top: 50px;
`;
const Artist = styled.div`
  text-align: center;
`;
const ArtistLink = styled.a`
  position: relative;
  width: 100%;
`;
const ArtistImage = styled.img`
  border-radius: 100%;
  object-fit: cover;
  width: 150px;
  height: 150px;
`;
const ArtistName = styled.a`
  margin: ${theme.spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;

class TopArtists extends Component {
  state = {
    topArtists: null,
    activeRange: '',
  };

  static propTypes = {
    topArtists: PropTypes.object,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getTopArtistsLong().then(res => {
      if (this._isMounted) {
        this.setState({ topArtists: res.data, activeRange: 'long' });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ topArtists: null });
  }

  setActiveRange = range => {
    if (range === 'long') {
      getTopArtistsLong().then(res => {
        this.setState({ topArtists: res.data, activeRange: range });
      });
    } else if (range === 'medium') {
      getTopArtistsMedium().then(res => {
        this.setState({ topArtists: res.data, activeRange: range });
      });
    } else if (range === 'short') {
      getTopArtistsShort().then(res => {
        this.setState({ topArtists: res.data, activeRange: range });
      });
    }
  };

  render() {
    const { topArtists, activeRange } = this.state;

    return (
      <Container>
        <Header>
          <h2>Top Artists</h2>
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
        <ArtistsContainer>
          {topArtists &&
            topArtists.items.map((artist, i) => (
              <Artist key={i}>
                <ArtistLink href={artist.external_urls.spotify} target="_blank">
                  <ArtistImage src={artist.images[1].url} alt="" />
                </ArtistLink>
                <ArtistName href={artist.external_urls.spotify} target="_blank">
                  {artist.name}
                </ArtistName>
              </Artist>
            ))}
        </ArtistsContainer>
      </Container>
    );
  }
}

export default TopArtists;
