import axios from 'axios';

export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const getRefreshToken = () => {
  return window.localStorage.getItem('spotify_refresh_token');
};

export const refresh_token = getRefreshToken();

export const getNewToken = () => axios.get(`/refresh_token?refresh_token=${refresh_token}`);

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);

    getNewToken().then(res => {
      const { access_token } = res.data;
      window.localStorage.setItem('spotify_access_token', access_token);
      return access_token;
    });
  }

  const local_access_token = window.localStorage.getItem('spotify_access_token');

  if (window.localStorage.getItem('spotify_refresh_token') === null) {
    window.localStorage.setItem('spotify_refresh_token', refresh_token);
  }

  if (window.localStorage.getItem('spotify_access_token') === null) {
    window.localStorage.setItem('spotify_access_token', access_token);
    return access_token;
  }

  return local_access_token;
};

export const token = getAccessToken();

const headers = { Authorization: `Bearer ${token}` };

const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

export const getPlaylistTracks = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

export const getAudioFeaturesForTracks = tracks => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

// fuck seed artists, seed tracks, and seed genres are required?
export const getRecommendationsForTracks = tracks => {
  const trackIds = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}`, {
    headers,
  });
};

export const getTrack = trackId =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

export const getTrackAudioAnalysis = trackId =>
  axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });

export const getTrackAudioFeatures = trackId =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

export const getTrackInfo = trackId => {
  return axios
    .all([getTrack(trackId), getTrackAudioAnalysis(trackId), getTrackAudioFeatures(trackId)])
    .then(
      axios.spread((track, audioAnalysis, audioFeatures) => {
        return {
          track: track.data,
          audioAnalysis: audioAnalysis.data,
          audioFeatures: audioFeatures.data,
        };
      }),
    );
};

export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getUserInfo = () => {
  return axios.all([getUser(), getFollowing(), getPlaylists()]).then(
    axios.spread((user, followedArtists, playlists) => {
      return {
        user: user.data,
        followedArtists: followedArtists.data,
        playlists: playlists.data,
      };
    }),
  );
};
