import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getPlaylistTracks } from '../spotify';

import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.div``;

// get url param of playlist id
// get playlist tracks
// display cool stuff

class PlaylistInfo extends Component {
  static propTypes = {
    playlistId: PropTypes.string.isRequired,
  };

  state = {
    tracks: null,
  };

  componentDidMount() {
    const { playlistId } = this.props;

    getPlaylistTracks(playlistId).then(res => this.setState({ tracks: res.data }));
  }

  render() {
    const { tracks } = this.state;

    console.log(tracks);

    return <Container>playlist</Container>;
  }
}

export default PlaylistInfo;
