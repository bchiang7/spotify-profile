import React from 'react';
import { Helmet } from 'react-helmet';

const metadata = {
  url: 'https://spotify-profile.herokuapp.com/',
  title: 'Spotify Profile',
  description: 'A web app for visualizing personalized Spotify data',
  siteLanguage: 'en',
  themeColor: '#1DB954',
  siteUrl: 'https://spotify-profile.herokuapp.com',
  twitterHandle: '@bchiang7',
};

const Head = () => (
  <Helmet>
    <meta name="description" content={metadata.description} />

    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={metadata.siteUrl} />
    <meta property="og:site_name" content={metadata.title} />

    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content={metadata.siteLanguage} />
    <meta itemProp="name" content={metadata.title} />
    <meta itemProp="description" content={metadata.description} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={metadata.siteUrl} />
    <meta name="twitter:site" content={metadata.twitterHandle} />
    <meta name="twitter:creator" content={metadata.twitterHandle} />
    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:description" content={metadata.description} />
    <meta name="twitter:image:alt" content={metadata.title} />

    <meta name="msapplication-TileColor" content={metadata.themeColor} />

    <meta name="theme-color" content={metadata.themeColor} />
  </Helmet>
);

export default Head;
