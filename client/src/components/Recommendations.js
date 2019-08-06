import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import {
  getPlaylist,
  getRecommendationsForTracks,
  getUser,
  createPlaylist,
  addTracksToPlaylist,
  followPlaylist,
  doesUserFollowPlaylist,
} from '../spotify';
import { catchErrors } from '../utils';

import TrackItem from './TrackItem';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../styles';
const { colors } = theme;

const PlaylistHeading = styled.div`
  ${mixins.flexBetween};
  ${media.tablet`
    flex-direction: column;

  `};
  h2 {
    margin-bottom: 0;
  }
`;
const SaveButton = styled.button`
  ${mixins.greenButton};
`;
const OpenButton = styled.a`
  ${mixins.button};
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
  static propTypes = {
    playlistId: PropTypes.string.isRequired,
  };

  state = {
    playlist: null,
    recommendations: null,
    userId: null,
    isFollowing: false,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getRecommendationsForTracks(playlist.tracks.items);
      this.setState({ recommendations: data });
    }
  }

  getTrackUris = recommendations => recommendations.tracks.map(({ uri }) => uri);

  createPlaylist = async () => {
    const { playlist } = this.state;
    const name = `Recommended Tracks Based on ${playlist.name}`;
    const { data } = await getUser();
    const userId = data.id;
    this.setState({ userId });

    if (data) {
      const { data } = await createPlaylist(userId, name);
      const recPlaylistId = data.id;
      this.setState({ recPlaylistId });

      if (data) {
        catchErrors(this.addTracksAndFollow(recPlaylistId));
      }
    }
  };

  addTracksAndFollow = async playlistId => {
    const { recommendations } = this.state;
    const uris = this.getTrackUris(recommendations).join(',');
    const { data } = await addTracksToPlaylist(playlistId, uris);

    if (data) {
      await followPlaylist(playlistId);
      catchErrors(this.isFollowing(playlistId));
    }
  };

  isFollowing = async playlistId => {
    const { userId } = this.state;
    const { data } = await doesUserFollowPlaylist(playlistId, userId);
    this.setState({ isFollowing: data[0] });
  };

  render() {
    const { playlist, recommendations, isFollowing, recPlaylistId } = this.state;

    return (
      <Main>
        {playlist && (
          <PlaylistHeading>
            <h2>
              Recommended Tracks Based On{' '}
              <PlaylistLink to={`/playlist/${playlist.id}`}>{playlist.name}</PlaylistLink>
            </h2>
            {isFollowing && recPlaylistId ? (
              <OpenButton
                href={`https://open.spotify.com/playlist/${recPlaylistId}`}
                target="_blank"
                rel="noopener noreferrer">
                Open in Spotify
              </OpenButton>
            ) : (
              <SaveButton onClick={catchErrors(this.createPlaylist)}>Save to Spotify</SaveButton>
            )}
          </PlaylistHeading>
        )}
        <TracksContainer>
          {recommendations &&
            recommendations.tracks.map((track, i) => <TrackItem track={track} key={i} />)}
        </TracksContainer>
      </Main>
    );
  }
}

export default Recommendations;
