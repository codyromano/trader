import React from 'react';
import PlainButton from './PlainButton';
import Image from './Image';

export default class ImageButton extends React.PureComponent {
  labelStyle = {
    padding: '0.1rem',
    display: 'block',
    textAlign: 'left',
  }

  render() {
    const { imageSrc, onClick, label } = this.props;
    return (
      <PlainButton onClick={onClick}>
        <Image height="5rem" width="7rem" src={imageSrc} />
        <div>{label}</div>
      </PlainButton>
    );
  }
}
