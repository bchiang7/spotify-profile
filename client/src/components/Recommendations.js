import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPlaylistTracks, getRecommendationsForTracks } from '../spotify';
// import Track from './Track';
import styled from 'styled-components/macro';
// import { theme, mixins } from '../styles';

const Container = styled.div``;
const TracksContainer = styled.div``;

class Recommendations extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

  state = {
    tracks: null,
    recommendations: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { playlistId } = this.props;

    try {
      const { data } = await getPlaylistTracks(playlistId);
      this.setState({ tracks: data });

      if (data) {
        const { tracks } = this.state;
        const { data } = await getRecommendationsForTracks(tracks);
        console.log(data);

        this.setState({ recommendations: data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { recommendations } = this.state;
    // console.log(recommendations);

    return (
      <Container>
        <h2>Recommended Tracks Based On Insert Playlist Here</h2>
        <TracksContainer>
          {/* {recommendations &&
            recommendations.tracks.map((track, i) => <Track track={track} key={i} />)} */}
        </TracksContainer>
      </Container>
    );
  }
}

export default Recommendations;
