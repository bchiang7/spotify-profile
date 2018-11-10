import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { theme, Section } from '../styles';

const Container = styled(Section)``;
const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${theme.spacing.base};
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
  render() {
    const { topArtists } = this.props;
    // console.log(topArtists.items);

    return (
      <Container>
        <h2>Top Artists</h2>
        <ArtistsContainer>
          {topArtists.items.map((artist, i) => (
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

TopArtists.propTypes = {
  topArtists: PropTypes.object,
};

export default TopArtists;
