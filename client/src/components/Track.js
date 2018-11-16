import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { formatDuration } from '../utils';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
  display: flex;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${theme.spacing.base};
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: ${theme.colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const TrackContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  &:hover {
    ${Mask} {
      opacity: 1;
    }
  }
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
      <TrackArtwork to={`/track/${track.id}`}>
        {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
        <Mask>
          <i className="fas fa-info-circle" />
        </Mask>
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
