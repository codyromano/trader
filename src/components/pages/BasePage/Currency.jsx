import React from 'react';

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export default class Currency extends React.PureComponent {
  dangerStyle = {
    color: 'red'
  };

  normalStyle = {};

  render() {
    let { n: number } = this.props;

    if (number < 100 && number.toFixed(2).slice(-2) !== '00') {
      number = number.toFixed(2);
    } else {
      number = number.toFixed(0);
    }
    return <span style={number < 0 ? this.dangerStyle : this.normalStyle}>
      {!this.props.hidePrefix && '$'}
      {numberWithCommas(number)}
    </span>;
  }
}