import React, { Component } from 'react';

import styled from 'styled-components';
import { theme, Img, A } from '../style';

const Container = styled.div``;
const Title = styled.h3`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.spacing.md};
`;
const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const Artist = styled.div`
  text-align: center;
`;
const ArtistLink = A.extend`
  position: relative;
`;
const ArtistImage = Img.extend`
  border-radius: 100%;
`;
const ArtistName = A.extend`
  margin: ${theme.spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;

class TopArtists extends Component {
  render() {
    const { topArtists } = this.props;
    console.log(topArtists.items);

    return (
      <Container>
        <Title>Top Artists</Title>
        <ArtistsContainer>
          {topArtists.items.map((artist, i) => (
            <Artist key={i}>
              <ArtistLink href={artist.external_urls.spotify} target="_blank">
                <ArtistImage src={artist.images[0].url} alt="" />
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
