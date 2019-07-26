import React from 'react';

// TODO: Move to header
const headerStyle = {
  1: {
    fontSize: '1.5rem',
    lineHeight: '125%',
  },
  2: {
    fontSize: '1.25rem',
  },
  3: {
    fontSize: '1rem',
  },
};
export const Header = ({ children, level }) => (
  <strong style={headerStyle[level]}>{children}</strong>
);

const textStyle = {
  regular: {
    fontSize: '0.9rem',
  },
  small: {
    fontSize: '0.8rem',
  },
};
export const Text = ({ children, size, accent, danger }) => {
  const style = {
    ...textStyle[size],
  };
  if (accent) {
    style.color = '#3498db';
  }
  if (danger) {
    style.color = '#e74c3c';
  }

  return <span style={style}>{children}</span>;
};

Text.defaultProps = {
  size: 'regular',
};
