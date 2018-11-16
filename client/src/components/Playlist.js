import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

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
const RecButton = styled(Link)`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 12px 25px;
  margin-top: 20px;
  font-weight: 700;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
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

class Playlist extends Component {
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
    // console.log(playlist);
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
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Name>{playlist.name}</Name>
              </a>
              <Owner>By {playlist.owner.display_name}</Owner>
              {playlist.description && <Description>{playlist.description}</Description>}
              <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>

              <RecButton to={`/recommendations/${playlist.id}`}>Get Recommendations</RecButton>

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

export default Playlist;
