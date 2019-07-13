import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

class Metric extends React.PureComponent {
  render() {
    const { danger } = this.props;
    const valueClassName = danger ? `item-metric-value item-error` : `item-metric-value`;
    return (
      <div className="item-metric">
        <div className="item-metric-label">
          {this.props.label}
        </div>
        <div className={valueClassName}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const formatCurrency = (value) => `$${value}`;

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsufficientFundsNotice: false,
    };
  }

  onBuyPressed = () => {
    this.setState({
      showInsufficientFundsNotice: !this.props.isAffordable
    });
  };

  render() {
    const { title, isAffordable, iconSrc, cost, marketValue } = this.props;
    const { showInsufficientFundsNotice } = this.state;
    return (
      <div className="item">
        <img src={iconSrc} className="item-thumbnail" />

        <div className="item-title">{title}</div>

        <Metric danger={!isAffordable} label="Cost">{formatCurrency(cost)}</Metric>

        <div className="item-actions">
          {isAffordable && <button onClick={this.onBuyPressed}>Buy</button>}
        </div>
      </div>
    )
  }
}