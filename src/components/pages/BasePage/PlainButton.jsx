import React from 'react';

export default class PlainButton extends React.PureComponent {
  defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
    this.style = {
      ...props.style,
      appearance: 'none',
      margin: '0px',
      padding: '0px',
      border: 'none',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
    };
  }

  render() {
    return (
      <button {...this.props} style={this.style}>
        {this.props.children}
      </button>
    )
  }
}