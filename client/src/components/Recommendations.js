import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  getPlaylist,
  getRecommendationsForTracks,
  getUser,
  createPlaylist,
  addTracksToPlaylist,
  followPlaylist,
} from '../spotify';

import TrackItem from './TrackItem';

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

  getTrackUris = recommendations => recommendations.tracks.map(({ uri }) => uri);

  createPlaylist = async () => {
    const { playlist, recommendations } = this.state;
    const uris = this.getTrackUris(recommendations).join(',');

    try {
      const { data } = await getUser();
      const userId = data.id;
      const name = `Recommended Tracks Based on ${playlist.name}`;

      if (data) {
        const { data } = await createPlaylist(userId, name);
        const playlistId = data.id;

        if (data) {
          const { data } = await addTracksToPlaylist(playlistId, uris);

          if (data) {
            await followPlaylist(playlistId);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { playlist, recommendations } = this.state;
    // console.log(recommendations);

    return (
      <Section>
        {playlist && (
          <PlaylistHeading>
            <h2>
              Recommended Tracks Based On{' '}
              <PlaylistLink to={`/playlist/${playlist.id}`}>{playlist.name}</PlaylistLink>
            </h2>
            <SaveButton onClick={this.createPlaylist}>Save Playlist to Spotify</SaveButton>
            {/* Change save button to "open in spotify" button once created */}
          </PlaylistHeading>
        )}
        <TracksContainer>
          {recommendations &&
            recommendations.tracks.map((track, i) => <TrackItem track={track} key={i} />)}
        </TracksContainer>
      </Section>
    );
  }
}

export default Recommendations;
