import React, { Component } from 'react';
import { formatWithCommas } from '../utils';
import { getArtist, followArtist, doesUserFollowArtist } from '../spotify';

import Loader from './Loader';

import styled from 'styled-components/macro';
import { theme, mixins, media, Section } from '../styles';
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;
const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};
  ${media.tablet`
    font-size: 7vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;
const Stat = styled.div``;
const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;
const Genre = styled.div`
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const FollowButton = styled.button`
  ${mixins.greenButton};
  margin-top: 50px;
  padding: 12px 50px;
  background-color: ${props => (props.isFollowing ? 'transparent' : colors.green)};
  border: 1px solid ${props => (props.isFollowing ? 'white' : 'transparent')};
  pointer-events: ${props => (props.isFollowing ? 'none' : 'auto')};
  cursor: ${props => (props.isFollowing ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${props => (props.isFollowing ? 'transparent' : colors.offGreen)};
  }
`;

class Artist extends Component {
  state = {
    artist: null,
    isFollowing: null,
  };

  componentDidMount() {
    this.getData();
    this.isFollowing();
  }

  async getData() {
    const { artistId } = this.props;

    try {
      const { data } = await getArtist(artistId);
      this.setState({ artist: data });
    } catch (e) {
      console.error(e);
    }
  }

  follow = async () => {
    const { artistId } = this.props;

    try {
      await followArtist(artistId);
      this.isFollowing();
    } catch (e) {
      console.error(e);
    }
  };

  isFollowing = async () => {
    const { artistId } = this.props;

    try {
      const { data } = await doesUserFollowArtist(artistId);
      this.setState({ isFollowing: data[0] });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { artist, isFollowing } = this.state;

    return (
      <React.Fragment>
        {artist ? (
          <ArtistContainer>
            <Artwork>
              <img src={artist.images[0].url} alt="Artist Artwork" />
            </Artwork>
            <div>
              <ArtistName>{artist.name}</ArtistName>
              <Stats>
                <Stat>
                  <Number>{formatWithCommas(artist.followers.total)}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>
                {artist.genres && (
                  <Stat>
                    <Number>
                      {artist.genres.map(genre => (
                        <Genre key={genre}>{genre}</Genre>
                      ))}
                    </Number>
                    <NumLabel>Genres</NumLabel>
                  </Stat>
                )}
                {artist.popularity && (
                  <Stat>
                    <Number>{artist.popularity}%</Number>
                    <NumLabel>Popularity</NumLabel>
                  </Stat>
                )}
              </Stats>
            </div>
            <FollowButton isFollowing={isFollowing} onClick={this.follow}>
              {isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
          </ArtistContainer>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Artist;
