import React from 'react';
import PlainButton from './PlainButton';
import { Text } from './Typography';

const Button = ({ muted, disabled, small, children, ...restProps }) => {
  const style = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: small ? '0.35rem' : '0.5rem',
    borderRadius: '0.25rem',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    [muted && 'backgroundColor']: '#ccc',
    [muted && 'color']: '#000',
  };

  return (
    <PlainButton disabled={disabled} {...restProps}>
      <strong style={style}>
        <Text size={small}>{children}</Text>
      </strong>
    </PlainButton>
  );
};

export default Button;
