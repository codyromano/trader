import React from 'react';
import PlainButton from './PlainButton';
import { Text } from './Typography';

const Button = ({ muted, children, ...restProps }) => {
  const style = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    [muted && 'backgroundColor']: '#ccc',
    [muted && 'color']: '#000',
  };

  return (
    <PlainButton {...restProps}>
      <strong style={style}>
        <Text>{children}</Text>
      </strong>
    </PlainButton>
  );
};

export default Button;
