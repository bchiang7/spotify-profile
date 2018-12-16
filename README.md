# Spotify Profile (WIP)

## Getting Started

1.  [Register a Spotify Application](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8888/callback` as a Redirect URI in the app settings
2.  Create an `.env` file in the root of the project based on `.env.example`
3.  `yarn && yarn client:install`
4.  `yarn dev`

## Heroku Set Up & Deployment

```bash
heroku create app-name
heroku config:set SPOTIFY_CLIENT_ID=XXXXX
heroku config:set SPOTIFY_CLIENT_SECRET=XXXXX
heroku config:set REDIRECT_URI=https://app-name-here.herokuapp.com/callback
heroku config:set FRONTEND_URI=https://app-name-here.herokuapp.com
git push heroku master
```

Then add `http://app-name.herokuapp.com/callback` as a Redirect URI in the spotify application settings. Go to http://app-name.herokuapp.com/login and it should redirect to http://app-name.herokuapp.com?access_token=XXXXX where XXXXX is a valid access token.
