import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPlaylist, getRecommendationsForTracks } from '../spotify';
import Track from './Track';
import styled from 'styled-components/macro';
// import { theme, mixins } from '../styles';

const Container = styled.div``;
const TracksContainer = styled.div`
  margin-top: 50px;
`;

class Recommendations extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

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

  render() {
    const { playlist, recommendations } = this.state;
    console.log(recommendations);

    return (
      <Container>
        {playlist && <h2>Recommended Tracks Based On {playlist.name}</h2>}
        <TracksContainer>
          {recommendations &&
            recommendations.tracks.map((track, i) => <Track track={track} key={i} />)}
        </TracksContainer>
      </Container>
    );
  }
}

export default Recommendations;
