import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../style';

const Container = styled(Section)`
  width: 100%;
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
const TrackLeft = styled.span`
  display: flex;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.span`
  width: 50px;
  min-width: 50px;
  margin-right: ${theme.spacing.base};
`;
const TrackImage = styled.img``;
const TrackMeta = styled.span`
  max-width: 80%;
`;
const TrackName = styled.a`
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
const TrackDuration = styled.span`
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.sm};
`;

class RecentlyPlayed extends Component {
  formatDuration(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  render() {
    const { recentlyPlayed } = this.props;
    // console.log(recentlyPlayed);

    return (
      <Container>
        <Title>Recently Played Tracks</Title>
        <TracksContainer>
          {recentlyPlayed.items.map((item, i) => (
            <Track key={i}>
              <TrackLeft>
                <TrackArtwork>
                  {item.track.album.images && (
                    <TrackImage src={item.track.album.images[0].url} alt="" />
                  )}
                </TrackArtwork>
                <TrackMeta>
                  <TrackName href={item.track.external_urls.spotify} target="_blank">
                    {item.track.name}
                  </TrackName>
                  <ArtistAlbum>
                    {item.track.artists[0].name}
                    &nbsp;&middot;&nbsp;
                    {item.track.album.name}
                  </ArtistAlbum>
                </TrackMeta>
              </TrackLeft>
              <TrackRight>
                <TrackDuration>{this.formatDuration(item.track.duration_ms)}</TrackDuration>
              </TrackRight>
            </Track>
          ))}
        </TracksContainer>
      </Container>
    );
  }
}

RecentlyPlayed.propTypes = {
  recentlyPlayed: PropTypes.object,
};

export default RecentlyPlayed;
