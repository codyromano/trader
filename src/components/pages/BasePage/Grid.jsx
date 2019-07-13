import React from 'react';

export class Spacing extends React.PureComponent {
  unit = 1;
  defaultProps = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  };

  render() {
    const { top, bottom, left, right } = this.props;
    const { unit } = this;

    const style = {
      marginTop: `${top * unit}rem`,
      marginBottom: `${bottom * unit}rem`,
      marginLeft: `${left * unit}rem`,
      marginRight: `${right * unit}rem`
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

export class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.style = {
      ...props.style,
      display: 'flex',
      maxWidth: '40rem',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
  }
  render() {
    return (
      <Spacing bottom={this.props.collapsed ? 0 : 1}>
        <div style={this.style}>
          {this.props.children}
        </div>
      </Spacing>
    )
  }
}

Row.defaultProps = {
  style: {}
};

export class Col extends React.PureComponent {
  constructor(props) {
    super(props);
    this.style = {
      width: `${this.props.width * 10}%`,
    };
  }
  render() {
    return (
      <div style={this.style}>
        {this.props.children}
      </div>
    )
  }
}
