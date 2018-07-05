import { injectGlobal } from 'styled-components';

const fonts = injectGlobal`
  @font-face {
    font-family: 'Circular Std Book';
    font-style: normal;
    font-weight: 400;
    src: local('Circular Std Book'), url('../fonts/CircularStd-Book.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Book Italic';
    font-style: italic;
    font-weight: 400;
    src: local('Circular Std Book Italic'), url('../fonts/CircularStd-BookItalic.woff') format('woff');
  }


  @font-face {
    font-family: 'Circular Std Medium';
    font-style: normal;
    font-weight: 500;
    src: local('Circular Std Medium'), url('../fonts/CircularStd-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Medium Italic';
    font-style: italic;
    font-weight: 500;
    src: local('Circular Std Medium Italic'), url('../fonts/CircularStd-MediumItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Bold';
    font-style: normal;
    font-weight: 700;
    src: local('Circular Std Bold'), url('../fonts/CircularStd-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Bold Italic';
    font-style: italic;
    font-weight: 700;
    src: local('Circular Std Bold Italic'), url('../fonts/CircularStd-BoldItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Black';
    font-style: normal;
    font-weight: 900;
    src: local('Circular Std Black'), url('../fonts/CircularStd-Black.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std Black Italic';
    font-style: italic;
    font-weight: 900;
    src: local('Circular Std Black Italic'), url('../fonts/CircularStd-BlackItalic.woff') format('woff');
  }
`;

export default fonts;
