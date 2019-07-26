import React from 'react';
import { MILLION, BILLION, TRILLION } from './constants';

const numberWithCommas = (x) => {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const numberAbbreviations = [[TRILLION, 't'], [BILLION, 'b'], [MILLION, 'm'], [1000, 'k']];

export default class Currency extends React.PureComponent {
  dangerStyle = {
    color: 'red',
  };

  normalStyle = {};

  render() {
    let { n: number } = this.props;
    const negative = number < 0;

    let letter = '';

    for (const [threshold, abbreviation] of numberAbbreviations) {
      if (number >= threshold) {
        number = number / threshold;
        letter = abbreviation;
        break;
      }
    }
    const baseDigits = Math.round(number).toString().length;
    number = baseDigits < 3 ? number.toFixed(2) : number.toFixed(0);

    const parts = number.split('.');

    if (parseInt(parts[1]) === 0) {
      number = parts[0];
    }
    number += letter;

    return (
      <span style={negative ? this.dangerStyle : this.normalStyle}>
        {!this.props.hidePrefix && '$'}
        {numberWithCommas(number)}
      </span>
    );
  }
}
