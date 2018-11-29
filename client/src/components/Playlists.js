import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { getPlaylists } from '../spotify';

import Loader from './Loader';

import styled from 'styled-components/macro';
import { theme, mixins, Section } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Container = styled(Section)``;
const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const PlaylistsContainer = styled(Section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${spacing.md};
  width: 100%;
`;
const Playlist = styled.div`
  text-align: center;
`;
const PlaylistMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const PlaylistImage = styled.img`
  object-fit: cover;
`;
const PlaylistCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  &:hover {
    ${PlaylistMask} {
      opacity: 1;
    }
  }
`;
const PlaylistName = styled.span`
  margin: ${spacing.base} 0 5px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${colors.white};
  }
`;
const PlaylistDetails = styled.div`
  text-transform: uppercase;
  margin-bottom: 5px;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

class Playlists extends Component {
  static propTypes = {
    playlists: PropTypes.object,
  };

  state = {
    playlists: null,
  };

  componentDidMount() {
    getPlaylists().then(res => this.setState({ playlists: res.data }));
  }

  render() {
    const { playlists } = this.state;

    // console.log(playlists);

    return (
      <Container>
        <h2>Your Playlists</h2>
        <Wrapper>
          <PlaylistsContainer>
            {playlists ? (
              playlists.items.map(({ id, images, name, tracks }, i) => (
                <Playlist key={i}>
                  <PlaylistCover to={id}>
                    {images && <PlaylistImage src={images[0].url} alt="Album Art" />}
                    <PlaylistMask>
                      <i className="fas fa-info-circle" />
                    </PlaylistMask>
                  </PlaylistCover>
                  <Link to={id}>
                    <PlaylistName>{name}</PlaylistName>
                  </Link>
                  <PlaylistDetails>{tracks.total} Tracks</PlaylistDetails>
                </Playlist>
              ))
            ) : (
              <Loader />
            )}
          </PlaylistsContainer>
        </Wrapper>
      </Container>
    );
  }
}

export default Playlists;
