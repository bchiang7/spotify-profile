import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Head extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Spotify Profile</title>
        <meta name="description" content="Description" />
        <meta property="description" content="Description" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
      </Helmet>
    );
  }
}

export default Head;
