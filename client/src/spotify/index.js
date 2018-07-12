import axios from 'axios';

function getHashParams() {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function getAccessToken() {
  const params = getHashParams();

  if (params.error) {
    alert('There was an error during authentication');
  }

  if (!params.access_token) {
    return;
  }

  return params.access_token;
}

export const token = getAccessToken();

export function getUser() {
  axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      if (response.data) {
        // console.log(response.data);
        return response.data;
      }
    })
    .catch(error => console.error(error));
}
