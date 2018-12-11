import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getPlaylist, getRecommendationsForTracks, createPlaylist } from '../spotify';

import Track from './Track';

import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';
const { colors } = theme;

const PlaylistHeading = styled.div`
  ${mixins.flexBetween};
  h2 {
    margin-bottom: 0;
  }
`;
const SaveButton = styled.button`
  ${mixins.greenButton};
`;
const TracksContainer = styled.ul`
  margin-top: 50px;
`;
const PlaylistLink = styled(Link)`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;

class Recommendations extends Component {
  state = {
    playlist: null,
    recommendations: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { playlistId } = this.props;

    try {
      const { data } = await getPlaylist(playlistId);
      this.setState({ playlist: data });

      if (data) {
        const { playlist } = this.state;
        const { data } = await getRecommendationsForTracks(playlist.tracks.items);
        this.setState({ recommendations: data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  createPlaylist = async () => {
    const { playlist } = this.state;
    const name = `Recommended Tracks Based On ${playlist.name}`;
    const userId = '';

    try {
      const { data } = await createPlaylist(userId, name);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { playlist, recommendations } = this.state;

    return (
      <Section>
        {playlist && (
          <PlaylistHeading>
            <h2>
              Recommended Tracks Based On{' '}
              <PlaylistLink to={`/playlist/${playlist.id}`}>{playlist.name}</PlaylistLink>
            </h2>
            <SaveButton onClick={this.createPlaylist}>Save Playlist to Spotify</SaveButton>
          </PlaylistHeading>
        )}
        <TracksContainer>
          {recommendations &&
            recommendations.tracks.map((track, i) => <Track track={track} key={i} />)}
        </TracksContainer>
      </Section>
    );
  }
}

export default Recommendations;
