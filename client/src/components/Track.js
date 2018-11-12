import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../utils';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const TrackContainer = styled.div`
  ${mixins.flexBetween};
  margin-bottom: ${theme.spacing.md};
`;
const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
  display: flex;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.span`
  width: 50px;
  min-width: 50px;
  margin-right: ${theme.spacing.base};
`;
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

const Track = ({ track }) => (
  <TrackContainer>
    <TrackLeft>
      <TrackArtwork>
        {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
      </TrackArtwork>
      <span>
        {track.name && track.external_urls && (
          <TrackName href={track.external_urls.spotify} target="_blank">
            {track.name}
          </TrackName>
        )}
        {track.artists && track.album && (
          <ArtistAlbum>
            {track.artists[0].name}
            &nbsp;&middot;&nbsp;
            {track.album.name}
          </ArtistAlbum>
        )}
      </span>
    </TrackLeft>
    <TrackRight>
      {track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}
    </TrackRight>
  </TrackContainer>
);

Track.propTypes = {
  track: PropTypes.object,
};

export default Track;
