import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTrackInfo } from '../spotify';
import { formatDuration, getYear } from '../utils';

import FeatureChart from './FeatureChart';

import Loader from './Loader';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors, fontSizes } = theme;

const Container = styled.div``;
const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
`;
const Info = styled.div`
  flex-grow: 1;
`;
const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0;
`;
const Artist = styled.h2`
  color: ${colors.lightestGrey};
  font-size: 20px;
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;
const AudioFeatures = styled.div`
  display: flex;
  max-height: 500px;
`;
const Features = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-content: flex-start;
  min-width: 250px;

  h4 {
    font-size: ${fontSizes.sm};
    margin-bottom: 0;
  }
  p {
    color: ${colors.lightGrey};
    font-size: 30px;
  }
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
    console.log(audioFeatures);

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
                  {track.album.name} &middot; {getYear(track.album.release_date)} &middot; Track{' '}
                  {track.track_number} of {track.album.total_tracks}
                </Album>
                <PlayTrackButton
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer">
                  Play on Spotify
                </PlayTrackButton>
              </Info>
            </TrackContainer>

            {audioFeatures && (
              <AudioFeatures>
                <Features>
                  <div>
                    <h4>Duration</h4>
                    <p>{formatDuration(audioFeatures.duration_ms)}</p>
                  </div>
                  <div>
                    <h4>Modality</h4>
                    <p>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</p>
                  </div>
                  <div>
                    <h4>Key</h4>
                    <p>{audioFeatures.key}</p>
                  </div>
                  <div>
                    <h4>Time Signature</h4>
                    <p>{audioFeatures.time_signature}</p>
                  </div>
                  <div>
                    <h4>Tempo</h4>
                    <p>{Math.round(audioFeatures.tempo)}</p>
                  </div>
                </Features>
                {/* <div>
                  <h4>Chart Type</h4>
                  <ul>
                    <li>
                      <button>Bar</button>
                    </li>
                    <li>
                      <button>Horizontal Bar</button>
                    </li>
                    <li>
                      <button>Doughnut</button>
                    </li>
                    <li>
                      <button>Polar Area</button>
                    </li>
                  </ul>
                </div> */}
                <FeatureChart features={audioFeatures} type="" />
              </AudioFeatures>
            )}
          </Container>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default TrackInfo;
