import React from 'react';
import PlainButton from './PlainButton';
import Image from './Image';
import { relative } from 'path';

const help = {
  display: 'inline-block',
};
const helpText = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  backgroundColor: '#fef',
  padding: '10px',
  maxWidth: '20rem',
  border: 'solid #000',
};

const close = {
  position: 'absolute',
  top: '5px',
  right: '5px',
};

export default class Help extends React.Component {
  state = {
    helpTextVisible: false,
  };

  onClick = () => {
    this.setState({
      helpTextVisible: true
    });
  };

  onClose = () => {
    this.setState({
      helpTextVisible: false,
    })
  };

  render() {
    return (
      <div style={help}>
        <PlainButton style={{
          color: 'green',
          textDecoration: 'underline',
          padding: '5px',
        }} onClick={this.onClick}>

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQazyjba4ETGVfL9JP1P1RYYDYTbLr6XG8_6Dk6CO3euy8apL4v"
            height="1rem"
            width="1rem"
          />
        </PlainButton>

        {this.state.helpTextVisible && (
          <div style={helpText}>
            <div style={close}>
              <PlainButton style={{
                fontWeight: 'bold',
                fontSize: '1.05rem'
              }} onClick={this.onClose}>X</PlainButton>
            </div>
            <p>{this.props.children}</p>
          </div>
        )}
      </div>
    )
  }
}