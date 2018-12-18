# Spotify Profile

A web app for visualizing personalized Spotify information

Built with a lot of things, but to name a few:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [Reach Router](https://reach.tech/router)
- [Styled Components](https://www.styled-components.com/)

## Getting Started

1. [Register a Spotify Application](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8888/callback` as a Redirect URI in the app settings
2. Create an `.env` file in the root of the project based on `.env.example`
3. `yarn && yarn client:install`
4. `yarn dev`

## Heroku Set Up & Deployment

1. Create new heroku app

   ```bash
   heroku create app-name
   ```

2. Set heroku environment variables

   ```bash
   heroku config:set SPOTIFY_CLIENT_ID=XXXXX
   heroku config:set SPOTIFY_CLIENT_SECRET=XXXXX
   heroku config:set REDIRECT_URI=https://app-name.herokuapp.com/callback
   heroku config:set FRONTEND_URI=https://app-name.herokuapp.com
   ```

3. Push to heroku

   ```bash
   git push heroku master
   ```

4. Add `http://app-name.herokuapp.com/callback` as a Redirect URI in the spotify application settings

5. Go to http://app-name.herokuapp.com/login and it should redirect to http://app-name.herokuapp.com?access_token=XXXXX where XXXXX is a valid access token
