import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../utils';
import { getRecentlyPlayed } from '../spotify';
import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';

const Container = styled(Section)`
  width: 100%;
  margin-bottom: ${theme.spacing.xl};
`;
const TracksContainer = styled.div``;
const Track = styled.div`
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
  color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSizes.sm};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TrackDuration = styled.span`
  color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSizes.sm};
`;

class RecentlyPlayed extends Component {
  state = {
    recentlyPlayed: null,
  };

  static propTypes = {
    recentlyPlayed: PropTypes.object,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    getRecentlyPlayed().then(res => {
      if (this._isMounted) {
        this.setState({ recentlyPlayed: res.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ recentlyPlayed: null });
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <Container>
        <h2>Recently Played Tracks</h2>
        <TracksContainer>
          {recentlyPlayed &&
            recentlyPlayed.items.map((item, i) => (
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
                  <TrackDuration>{formatDuration(item.track.duration_ms)}</TrackDuration>
                </TrackRight>
              </Track>
            ))}
        </TracksContainer>
      </Container>
    );
  }
}

export default RecentlyPlayed;
