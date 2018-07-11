import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, A, Img, Span, Section } from '../style';

const Container = Section.extend`
  width: 50%;
  margin-bottom: ${theme.spacing.xl};
`;
const Title = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
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
const TrackName = A.extend`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;
const ArtistAlbum = styled.div`
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.sm};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
    // console.log(topTracks.items);

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
                  <TrackName href={track.external_urls.spotify} target="_blank">
                    {track.name}
                  </TrackName>
                  <ArtistAlbum>
                    {track.artists[0].name}&nbsp;&middot;&nbsp;{track.album.name}
                  </ArtistAlbum>
                </TrackMeta>
              </TrackLeft>
              <TrackRight>
                <TrackDuration>{this.formatDuration(track.duration_ms)}</TrackDuration>
              </TrackRight>
            </Track>
          ))}
        </TracksContainer>
      </Container>
    );
  }
}

TopTracks.propTypes = {
  topTracks: PropTypes.object,
};

export default TopTracks;
