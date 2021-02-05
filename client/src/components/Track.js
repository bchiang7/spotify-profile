import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader';
import FeatureChart from './FeatureChart';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes } = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;
const Info = styled.div`
  flex-grow: 1;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;
const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;
const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: 20px;
  `};
  ${media.phablet`
    text-align: center !important;
  `};
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
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  border-top: 1px solid ${colors.grey};
  border-left: 1px solid ${colors.grey};
  ${media.thone`
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  `};
`;
const Feature = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
`;
const FeatureText = styled.h4`
  color: ${colors.lightestGrey};
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0;
  ${media.tablet`
    font-size: 24px;
  `};
`;
const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.xs};
  margin-bottom: 0;
`;
const DescriptionLink = styled.a`
  color: ${colors.lightestGrey};
  margin: 20px auto 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.white};
    border-bottom: 1px solid ${colors.white};
  }
`;

const Track = props => {
  const { trackId } = props;

  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    catchErrors(fetchData());
  }, [trackId]);

  return (
    <React.Fragment>
      {track ? (
        <Main>
          <TrackContainer>
            <Artwork>
              <img src={track.album.images[0].url} alt="Album Artwork" />
            </Artwork>
            <Info>
              <Title>{track.name}</Title>
              <ArtistName>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                      &nbsp;
                    </span>
                  ))}
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

          {audioFeatures && audioAnalysis && (
            <AudioFeatures>
              <Features>
                <Feature>
                  <FeatureText>{formatDuration(audioFeatures.duration_ms)}</FeatureText>
                  <FeatureLabel>Duration</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
                  <FeatureLabel>Key</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</FeatureText>
                  <FeatureLabel>Modality</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioFeatures.time_signature}</FeatureText>
                  <FeatureLabel>Time Signature</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
                  <FeatureLabel>Tempo (BPM)</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{track.popularity}%</FeatureText>
                  <FeatureLabel>Popularity</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.bars.length}</FeatureText>
                  <FeatureLabel>Bars</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                  <FeatureLabel>Beats</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.sections.length}</FeatureText>
                  <FeatureLabel>Sections</FeatureLabel>
                </Feature>
                <Feature>
                  <FeatureText>{audioAnalysis.segments.length}</FeatureText>
                  <FeatureLabel>Segments</FeatureLabel>
                </Feature>
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
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

Track.propTypes = {
  trackId: PropTypes.string,
};

export default Track;
