import React, { Component } from 'react';
import { formatDuration, getYear, parsePitchClass } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader';
import FeatureChart from './FeatureChart';

import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';
const { colors, fontSizes } = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;

  a {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      color: ${colors.white};
      border-bottom: 1px solid ${colors.white};
    }
  }
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
  margin: 0 0 5px;
`;
const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;
const AudioFeatures = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;
const Features = styled.div`
  ${mixins.flexBetween};
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
`;
const FeatureText = styled.h4`
  color: ${colors.lightestGrey};
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 0;
`;
const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.xs};
  margin-bottom: 0;
`;
const DescriptionLink = styled.a`
  color: ${colors.lightestGrey};
  margin: 30px auto 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.white};
    border-bottom: 1px solid ${colors.white};
  }
`;

class TrackInfo extends Component {
  state = {
    track: null,
    audioAnalysis: null,
    audioFeatures: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { trackId } = this.props;

    try {
      const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);
      this.setState({ track, audioAnalysis, audioFeatures });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { track, audioAnalysis, audioFeatures } = this.state;
    console.log(track, audioAnalysis);

    return (
      <React.Fragment>
        {track ? (
          <Section>
            <TrackContainer>
              <Artwork>
                <img src={track.album.images[0].url} alt="Album Artwork" />
              </Artwork>
              <Info>
                <Title>{track.name}</Title>
                <ArtistName>
                  {track.artists &&
                    track.artists.map(({ name }, i) => {
                      return (
                        <span key={i}>
                          {name}
                          {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                          &nbsp;
                        </span>
                      );
                    })}
                </ArtistName>
                <Album>
                  <a
                    href={track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer">
                    {track.album.name}
                  </a>{' '}
                  &middot; {getYear(track.album.release_date)}
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
                    <FeatureText>{formatDuration(audioFeatures.duration_ms)}</FeatureText>
                    <FeatureLabel>Duration</FeatureLabel>
                  </div>
                  <div>
                    <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
                    <FeatureLabel>Key</FeatureLabel>
                  </div>
                  <div>
                    <FeatureText>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</FeatureText>
                    <FeatureLabel>Modality</FeatureLabel>
                  </div>
                  <div>
                    <FeatureText>{audioFeatures.time_signature}</FeatureText>
                    <FeatureLabel>Time Signature</FeatureLabel>
                  </div>
                  <div>
                    <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
                    <FeatureLabel>Tempo (BPM)</FeatureLabel>
                  </div>
                  <div>
                    <FeatureText>{track.popularity}%</FeatureText>
                    <FeatureLabel>Popularity</FeatureLabel>
                  </div>
                </Features>

                <FeatureChart features={audioFeatures} type="" />

                <DescriptionLink
                  href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Full Description of Audio Features
                </DescriptionLink>
              </AudioFeatures>
            )}
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default TrackInfo;
