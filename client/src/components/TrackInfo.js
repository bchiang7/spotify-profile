import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTrackInfo } from '../spotify';

import FeatureChart from './FeatureChart';

import { IconLoader } from './icons';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.div`
  display: flex;
`;

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
            {track && (
              <div>
                <h1>{track.name}</h1>
                <h2>{track.artists[0].name}</h2>
                <h3>{track.album.name}</h3>

                <img src={track.album.images[0].url} alt="" />

                <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Play on Spotify
                </a>
                <p>Duration: {track.duration_ms}</p>
              </div>
            )}

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
        <IconLoader />
      </React.Fragment>
    );
  }
}

export default TrackInfo;
