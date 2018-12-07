import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { formatDuration } from '../utils';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors, fontSizes, spacing } = theme;

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;
const TrackRight = styled.span``;
const TrackArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
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
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const TrackContainer = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  margin-bottom: ${spacing.md};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;
const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;
const TrackName = styled.a`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;
const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;

const Track = ({ track }) => (
  <TrackContainer>
    <div>
      <TrackArtwork to={`/track/${track.id}`}>
        {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
        <Mask>
          <i className="fas fa-info-circle" />
        </Mask>
      </TrackArtwork>
    </div>
    <TrackMeta>
      <TrackLeft>
        {track.name && track.external_urls && (
          <TrackName href={track.external_urls.spotify} target="_blank">
            {track.name}
          </TrackName>
        )}
        {track.artists && track.album && (
          <TrackAlbum>
            {track.artists[0].name}
            &nbsp;&middot;&nbsp;
            {track.album.name}
          </TrackAlbum>
        )}
      </TrackLeft>
      <TrackRight>
        {track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}
      </TrackRight>
    </TrackMeta>
  </TrackContainer>
);

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
