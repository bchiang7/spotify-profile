import React from 'react';

const ScrollToTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

export default ScrollToTop;
