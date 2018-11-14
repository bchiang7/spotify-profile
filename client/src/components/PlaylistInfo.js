import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPlaylist, getAudioFeaturesForTracks } from '../spotify';

import Track from './Track';
import FeatureChart from './FeatureChart';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
`;
const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
`;
const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
const Name = styled.h3`
  font-weight: 700;
  font-size: ${theme.fontSizes.xl};
  margin-top: 20px;
`;
const Description = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.lightGrey};
`;
const Owner = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.white};
  margin-top: 20px;
`;

class PlaylistInfo extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null,
  };

  componentDidMount() {
    const { playlistId } = this.props;

    getPlaylist(playlistId)
      .then(res => this.setState({ playlist: res.data }))
      .then(() => {
        const { playlist } = this.state;
        getAudioFeaturesForTracks(playlist.tracks.items).then(res =>
          this.setState({ audioFeatures: res.data }),
        );
      });
  }

  render() {
    const { playlist, audioFeatures } = this.state;

    return (
      <React.Fragment>
        {playlist && (
          <Container>
            <Left>
              {playlist.images && (
                <PlaylistCover>
                  <img src={playlist.images[0].url} alt="Album Art" />
                </PlaylistCover>
              )}
              <Name>{playlist.name}</Name>
              <Owner>By {playlist.owner.display_name}</Owner>
              {playlist.description && <Description>{playlist.description}</Description>}
              <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>
              {/* TotalDuration */}

              {audioFeatures && <FeatureChart features={audioFeatures.audio_features} />}
            </Left>
            <Right>
              {playlist.tracks &&
                playlist.tracks.items.map(({ track }, i) => <Track track={track} key={i} />)}
            </Right>
            {/* Recommendations */}
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default PlaylistInfo;
