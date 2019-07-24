import React from 'react';

export default class Spacing extends React.PureComponent {
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
      marginRight: `${right * unit}rem`,
      ...this.props.style
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}
