import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../utils';
import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';

const Container = styled(Section)``;
const TracksContainer = styled.div``;
const Track = styled.div`
  ${mixins.flexBetween};
  margin-bottom: ${theme.spacing.md};
`;
const TrackLeft = styled.span`
  display: flex;
  ${mixins.overflowEllipsis};
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.span`
  width: 50px;
  min-width: 50px;
  margin-right: ${theme.spacing.base};
`;
const TrackImage = styled.img``;
const TrackMeta = styled.span``;
const TrackName = styled.a`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;
const ArtistAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSizes.sm};
`;
const TrackDuration = styled.span`
  color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSizes.sm};
`;

const Recommendations = ({ recommendations }) => (
  <Container>
    <h2>Recommended Tracks</h2>
    <TracksContainer>
      {recommendations.tracks.map((track, i) => (
        <Track key={i}>
          <TrackLeft>
            <TrackArtwork>
              {track.album.images[2] && <TrackImage src={track.album.images[2].url} alt="" />}
            </TrackArtwork>
            <TrackMeta>
              <TrackName href={track.external_urls.spotify} target="_blank">
                {track.name}
              </TrackName>
              <ArtistAlbum>
                {track.artists[0].name}
                &nbsp;&middot;&nbsp;
                {track.album.name}
              </ArtistAlbum>
            </TrackMeta>
          </TrackLeft>
          <TrackRight>
            <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>
          </TrackRight>
        </Track>
      ))}
    </TracksContainer>
  </Container>
);

Recommendations.propTypes = {
  recommendations: PropTypes.object,
};

export default Recommendations;
