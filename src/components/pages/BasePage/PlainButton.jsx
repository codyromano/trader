import React from 'react';

export default class PlainButton extends React.PureComponent {
  defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
    this.style = {
      appearance: 'none',
      margin: '0px',
      padding: '0px',
      border: 'none',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      ...props.style,
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