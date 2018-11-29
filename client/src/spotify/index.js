import axios from 'axios';
import { getHashParams } from '../utils';

// TOKENS ******************************************************************************************

const setLocalAccessToken = token => window.localStorage.setItem('spotify_access_token', token);
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
export const refreshAccessToken = () =>
  axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    // If Spotify returns an error, then refresh the token and return the new token
    refreshAccessToken().then(res => {
      const { access_token } = res.data;
      setLocalAccessToken(access_token);
      return access_token;
    });
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

// API CALLS ***************************************************************************************

const headers = { Authorization: `Bearer ${token}` };

// USER PROFILE
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

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

// TOP ARTISTS
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

// TOP TRACKS
export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

// PLAYLIST

export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

export const getPlaylistTracks = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

// Get a comma separated string of track IDs off of an array of tracks
const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

// AUDIO FEATURES
export const getAudioFeaturesForTracks = tracks => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

// RECOMMENDATIONS
// oh no seed artists, seed tracks, and seed genres are required?
export const getRecommendationsForTracks = tracks => {
  const trackIds = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}`, {
    headers,
  });
};

// TRACK
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
