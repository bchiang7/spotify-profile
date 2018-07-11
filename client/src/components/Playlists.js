import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FeatureChart from './FeatureChart';

import styled from 'styled-components';
import { theme, Img, A, Section, mixins } from '../style';

const Container = Section.extend``;
const Title = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;
const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${theme.spacing.lg};
  flex-grow: 1;
  margin-right: ${theme.spacing.lg};
`;
const Playlist = styled.div`
  text-align: center;
`;
const PlaylistImage = Img.extend`
  object-fit: cover;
  cursor: pointer;
`;
const PlaylistName = A.extend`
  margin: ${theme.spacing.base} 0 5px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;
const PlaylistDetails = styled.div`
  text-transform: uppercase;
  margin-bottom: 5px;
  color: ${theme.colors.grey};
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 1px;
`;

class Playlists extends Component {
  state = {
    chartPlaylist: this.props.playlists.items[0],
  };

  showFeatureChart(playlist) {
    this.setState({ chartPlaylist: playlist });
  }

  render() {
    const { playlists } = this.props;
    const { chartPlaylist } = this.state;
    // console.log(chartPlaylist);

    return (
      <Container>
        <Title>Your Playlists</Title>
        <Wrapper>
          <PlaylistsContainer>
            {playlists.items.map((playlist, i) => (
              <Playlist key={i} onClick={() => this.showFeatureChart(playlist)}>
                <PlaylistImage src={playlist.images[1].url} alt="" />
                <PlaylistName href={playlist.external_urls.spotify} target="_blank">
                  {playlist.name}
                </PlaylistName>
                <PlaylistDetails>{playlist.tracks.total} Tracks</PlaylistDetails>
              </Playlist>
            ))}
          </PlaylistsContainer>

          <FeatureChart chartPlaylist={chartPlaylist} />
        </Wrapper>
      </Container>
    );
  }
}

Playlists.propTypes = {
  playlists: PropTypes.object,
};

export default Playlists;
