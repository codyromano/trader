import React from 'react';
import { Row, Col } from './Grid';
import Currency from './Currency';

export default class Transact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
    };
  }
  onChangeQuantity = (event) => {
    this.setState({
      currentValue: parseInt(event.target.value, 10),
    })
  };
  transactSingleShare = () => {
    const { item, transactionType } = this.props;
    this.props.onTransact(transactionType, item, 1)
  }
  render() {
    const { item, transactionType, availableCash } = this.props;
    const verb = transactionType === 'buy' ? 'Buy' : 'Sell';

    let limit = 0;

    if (transactionType === 'buy') {
      limit = Math.floor(availableCash / item.value);
    } else {
      limit = this.props.quantityOwned;
    }

    const unitNounSingular = 'share';
    const unitNounPlural = 'shares';
    const noun = limit > 1 ? unitNounPlural : unitNounSingular;

    return (
      <React.Fragment>
        {limit === 1 && (
          <strong>You can {verb} 1 {noun} of {item.title}</strong>
        )}
        {limit > 1 && (
          <React.Fragment>
            <Row>
              <strong>{verb} up to {limit} {noun} of {item.title}</strong>
            </Row>
            <Row>
              <Currency n={item.value} /> * <Currency hidePrefix n={this.state.currentValue} /> = {' '}
              <Currency n={item.value * this.state.currentValue} hidePrefix />
            </Row>
          </React.Fragment>
        )}
        {limit > 1 && (<Row>
          <input type="range" value={this.state.currentValue} onChange={this.onChangeQuantity} min={0} max={limit} />
        </Row>)}
        <Row>
          <button onClick={this.props.onCancel}>Cancel</button>
          {limit > 1 && this.state.currentValue > 0 && (
            <button
              disabled={this.props.transactDisabled}
              onClick={() => this.props.onTransact(transactionType, item, this.state.currentValue)}>{verb}</button>
          )}

          {limit === 1 && (
            <button
              onClick={this.transactSingleShare}>{verb} 1 {noun}</button>
          )}
        </Row>
      </React.Fragment>
    )
  }
};
