import { injectGlobal } from 'styled-components';
import theme from './theme';

const base = injectGlobal`
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
    height: 100%;
    max-width: 100%;
  }
  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${theme.colors.white};
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
  }
`;

export default base;
