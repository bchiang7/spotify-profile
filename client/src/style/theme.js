const theme = {
  colors: {
    green: '#1DB954',
    offGreen: '#1ed760',
    black: '#191414',
    white: '#FFFFFF',
    grey: '#9B9B9B',

    // material ui color palette
    // red: '#F44336',
    // pink: '#E91E63',
    // purple: '#9C27B0',
    // deepPurple: '#673AB7',
    // indigo: '#3F51B5',
    // blue: '#2196F3',
    // lightBlue: '#03A9F4',
    // cyan: '#00BCD4',
    // teal: '#009688',
    // green: '#4CAF50',
    // lightGreen: '#8BC34A',
    // lime: '#CDDC39',
    // yellow: '#FFEB3B',
    // amber: '#FFC107',
    // orange: '#FF9800',
    // deepOrange: '#FF5722',
    // brown: '#795548',
    // blueGrey: '#607D8B',

    // material ui grayscale
    chrome000: '#FFFFFF',
    chrome100: '#F5F5F5',
    chrome200: '#EEEEEE',
    chrome300: '#E0E0E0',
    chrome400: '#BDBDBD',
    chrome500: '#9E9E9E',
    chrome600: '#757575',
    chrome700: '#616161',
    chrome800: '#424242',
    chrome900: '#212121',
  },

  fonts: {
    primary:
      'Circular Std Book, system, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Arial, sans-serif',
  },

  fontSizes: {
    base: `1rem`,
    xs: `0.7rem`,
    sm: `0.9rem`,
    md: `1.25rem`,
    lg: `2rem`,
    xl: `3rem`,
  },

  spacing: {
    base: `1rem`,
    xs: `0.5rem`,
    sm: `0.75rem`,
    md: `1.5rem`,
    lg: `2rem`,
    xl: `3rem`,
  },

  easing: {
    easeInCubic: `cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
    easeOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
    easeInOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
    easeInExpo: `cubic-bezier(0.95, 0.05, 0.795, 0.035)`,
    easeOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
    easeInOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
    easeInBack: `cubic-bezier(0.6, -0.28, 0.735, 0.045)`,
    easeOutBack: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    easeInOutBack: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  },

  transition: `all 0.25s ease`,
};

export default theme;
