import React, { Component } from 'react';
import Head from './Head';
import User from './User';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import styled from 'styled-components';
import { theme, mixins, A } from '../style';

const StyledApp = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  height: 100%;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
  border-top: 1rem solid ${theme.colors.green};
`;
const Login = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 75vh;
`;
const LoginButton = A.extend`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border-radius: 30px;
  padding: 18px 48px 16px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    background-color: ${theme.colors.offGreen};
  }
`;
const Profile = styled.div``;
const TopItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.spacing.xl};
`;

class App extends Component {
  state = {
    token: null,
    user: null,
    topArtists: null,
    seedArtists: '',
    topTracks: null,
    playlists: null,
  };

  componentDidMount() {
    const params = this.getHashParams();
    const access_token = params.access_token;

    if (params.error) {
      alert('There was an error during the authentication');
    }

    if (!access_token) {
      return;
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          token: access_token,
          user: data,
        })
      )
      .catch(error => console.error(`Fetch Error =\n`, error));

    setTimeout(() => {
      this.getTopArtists();
      this.getTopTracks();
      // this.getRecommendations();
      this.getPlaylists();
    }, 1000);
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getTopArtists() {
    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        let seed_artists = '';
        data.items.forEach(artist => {
          seed_artists += `${artist.id},`;
        });
        // console.log(seed_artists);

        this.setState({ topArtists: data, seedArtists: seed_artists });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getTopTracks() {
    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ topTracks: data });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getRecommendations() {
    const seed_artists =
      '4UXqAaa6dQYAk18Lv7PEgX,10exVja0key0uqUkk6LJRT,6LuN9FCkKOj5PcnpouEgny,20wkVLutqVOYrc0kxFs7rA,0hEurMDQu99nJRq8pTxO14,1anyVhU62p31KFi8MEzkbf,3LjhVl7GzYsza1biQjTpaN,7Ln80lUS6He07XvHI8qqHH,46gyXjRIvN1NL1eCB8GBxo,5aYyPjAsLj7UzANzdupwnS,73sIBHcqh3Z3NyqHKZ7FOL,20JZFwl6HVl6yg8a4H3ZqK,6qCQcw3ZKdmAFv0v4u5ey2,3YQKmKGau1PzlVlkL1iodx,1Xyo4u8uXC1ZmMpatF05PJ,2eam0iDomRHGBypaDQLwWI,06HL4z0CvFAxyc27GXpf02,49tQo2QULno7gxHutgccqF,3zxKH0qp3nBCuPZCZT5Vaf,3WfJ1OtrWI7RViX9DMyEGy';
    const url = `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}`;

    fetch(url, {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.setState({ recommendations: data });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getPlaylists() {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ playlists: data });
        this.getTracks();
      })
      // .then(() => this.getTracks())
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getTracks() {
    // get tracks of first playlist (eventually get all tracks of all playlists)
    fetch(`${this.state.playlists.items[0].tracks.href}`, {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // this.setState({ playlists: data });

        const ids = data.items.map(item => item.track.id).join(',');
        this.getPlaylistAudioFeatures(ids);
      })
      // .then(() => this.getPlaylistAudioFeatures())
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  getPlaylistAudioFeatures(ids) {
    fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.setState({ playlists: data });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  render() {
    const { user, topArtists, topTracks, playlists } = this.state;

    return (
      <StyledApp>
        <Head />
        {user ? (
          <Profile>
            <User user={user} />
            <TopItems>
              {topArtists && <TopArtists topArtists={topArtists} />}
              {topTracks && <TopTracks topTracks={topTracks} />}
            </TopItems>
            {playlists && <Playlists playlists={playlists} />}
          </Profile>
        ) : (
          <Login>
            <h1>Your Spotify Profile</h1>
            <LoginButton href="http://localhost:8888/login">
              Log in to Spotify
            </LoginButton>
          </Login>
        )}
      </StyledApp>
    );
  }
}

export default App;
