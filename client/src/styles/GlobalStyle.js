import { createGlobalStyle } from 'styled-components/macro';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium'), local('CircularStd-Medium'),
    url('../fonts/CircularStd-Medium.woff2') format('woff2'),
    url('../fonts/CircularStd-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book'), local('CircularStd-Book'),
    url('../fonts/CircularStd-Book.woff2') format('woff2'),
    url('../fonts/CircularStd-Book.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium Italic'), local('CircularStd-MediumItalic'),
    url('../fonts/CircularStd-MediumItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-MediumItalic.woff') format('woff');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black'), local('CircularStd-Black'),
    url('../fonts/CircularStd-Black.woff2') format('woff2'),
    url('../fonts/CircularStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold'), local('CircularStd-Bold'),
    url('../fonts/CircularStd-Bold.woff2') format('woff2'),
    url('../fonts/CircularStd-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold Italic'), local('CircularStd-BoldItalic'),
    url('../fonts/CircularStd-BoldItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book Italic'), local('CircularStd-BookItalic'),
    url('../fonts/CircularStd-BookItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BookItalic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black Italic'), local('CircularStd-BlackItalic'),
    url('../fonts/CircularStd-BlackItalic.woff2') format('woff2'),
    url('../fonts/CircularStd-BlackItalic.woff') format('woff');
    font-weight: 900;
    font-style: italic;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    background-color: ${colors.black};
    color: ${colors.white};
  }

  #root {
    min-height: 100%;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: ${theme.transition};
    cursor: pointer;
  }

  button {
    font-size: ${fontSizes.base};
    cursor: pointer;
    border: 0;
    border-radius: 0;
    transition: ${theme.transition};
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
  }

  input {
    border-radius: 0;
    outline: 0;
    &::placeholder {
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  button {
    border-radius: 0;
    outline: 0;
    color: ${colors.lightestGrey};
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    padding: 10px;

    &:hover, &:focus {
      color: ${colors.white};
    }
  }

  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  p {
    margin: 0 0 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px;
  }

  span {
    display: inline-block;
  }
`;

export default GlobalStyle;
