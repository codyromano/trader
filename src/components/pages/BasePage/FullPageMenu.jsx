import React from 'react';

const FullPageMenu = ({ children }) => (
  <div style={{
    position: 'fixed',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
  }}>
    {children}
  </div>
);

export default FullPageMenu;
