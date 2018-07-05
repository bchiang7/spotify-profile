import React, { Component } from 'react';

import styled from 'styled-components';
import { theme, mixins, Img, Span } from '../style';

const Container = styled.div``;
const Title = styled.h3`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.spacing.md};
`;
const TracksContainer = styled.div``;
const Track = styled.div`
  ${mixins.flexBetween};
  margin-bottom: ${theme.spacing.md};
`;
const TrackLeft = Span.extend`
  display: flex;
`;
const TrackRight = Span.extend``;
const TrackArtwork = Span.extend`
  width: 50px;
  min-width: 50px;
  margin-right: ${theme.spacing.base};
`;
const TrackImage = Img.extend``;
const TrackMeta = Span.extend``;
const TrackName = styled.div`
  margin-bottom: 5px;
`;
const ArtistAlbum = styled.div`
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.sm};
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TrackArtist = Span.extend``;
const TrackAlbum = Span.extend``;
const Separator = Span.extend`
  margin: 0 5px;
`;
const TrackDuration = Span.extend`
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.sm};
`;

class TopTracks extends Component {
  formatDuration(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  render() {
    const { topTracks } = this.props;
    console.log(topTracks.items);

    return (
      <Container>
        <Title>Top Tracks</Title>
        <TracksContainer>
          {topTracks.items.map((track, i) => (
            <Track key={i}>
              <TrackLeft>
                <TrackArtwork>
                  <TrackImage src={track.album.images[2].url} alt="" />
                </TrackArtwork>
                <TrackMeta>
                  <TrackName>{track.name}</TrackName>
                  <ArtistAlbum>
                    <TrackArtist>{track.artists[0].name}</TrackArtist>
                    <Separator>&bull;</Separator>
                    <TrackAlbum>{track.album.name}</TrackAlbum>
                  </ArtistAlbum>
                </TrackMeta>
              </TrackLeft>
              <TrackRight>
                <TrackDuration>
                  {this.formatDuration(track.duration_ms)}
                </TrackDuration>
              </TrackRight>
            </Track>
          ))}
        </TracksContainer>
      </Container>
    );
  }
}

export default TopTracks;
