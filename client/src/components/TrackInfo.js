import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTrackInfo } from '../spotify';
import { formatDuration } from '../utils';

import FeatureChart from './FeatureChart';

import { IconLoader } from './icons';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors } = theme;

const Container = styled.div``;
const TrackContainer = styled.div`
  display: flex;
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 300px;
  margin-right: 30px;
`;
const Info = styled.div`
  flex-grow: 1;
`;
const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;
const Title = styled.h1``;
const Artist = styled.h2`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 20px;
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;
const Duration = styled.p``;

class TrackInfo extends Component {
  static propTypes = {
    trackId: PropTypes.string,
  };

  state = {
    track: null,
    audioAnalysis: null,
    audioFeatures: null,
  };

  componentDidMount() {
    const { trackId } = this.props;

    getTrackInfo(trackId).then(({ track, audioAnalysis, audioFeatures }) => {
      this.setState({ track, audioAnalysis, audioFeatures });
    });
  }

  render() {
    const { track, audioAnalysis, audioFeatures } = this.state;
    console.log(track, audioAnalysis, audioFeatures);

    return (
      <React.Fragment>
        {track ? (
          <Container>
            <TrackContainer>
              <Artwork>
                <img src={track.album.images[0].url} alt="" />
              </Artwork>
              <Info>
                <Title>{track.name}</Title>
                <Artist>{track.artists[0].name}</Artist>
                <Album>
                  {track.album.name} &middot; {track.album.release_date}
                </Album>
                <Duration>Duration: {formatDuration(track.duration_ms)}</Duration>

                <PlayTrackButton
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer">
                  Play on Spotify
                </PlayTrackButton>
              </Info>
            </TrackContainer>

            {/* {track.images && (
              <TrackInfoCover>
                <img src={track.images[0].url} alt="Album Art" />
              </TrackInfoCover>
            )}
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <Name>{track.name}</Name>
            </a>
            <Owner>By {track.owner.display_name}</Owner>
            {track.description && <Description>{track.description}</Description>}
            <TotalTracks>{track.tracks.total} Tracks</TotalTracks>

            <RecButton to={`/recommendations/${track.id}`}>Get Recommendations</RecButton>

            {audioFeatures && <FeatureChart features={audioFeatures.audio_features} />} */}

            {/* Recommendations */}
          </Container>
        ) : (
          <IconLoader />
        )}
      </React.Fragment>
    );
  }
}

export default TrackInfo;
