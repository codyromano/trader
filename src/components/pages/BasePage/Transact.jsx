import React from 'react';
import { Row, Col } from './Grid';
import Currency from './Currency';
import RangeWithPreview from './RangeWithPreview';
import Spacing from './Spacing';

export default class Transact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 1,
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
    const { currentValue } = this.state;
    const { item, transactionType, availableCash, pouchSpace, pouchLimit } = this.props;
    const verb = transactionType === 'buy' ? 'Buy' : 'Sell';

    let limit = 0;

    if (transactionType === 'buy') {
      limit = Math.floor(availableCash / item.value);
      limit = Math.min(pouchSpace, limit);
    } else {
      limit = this.props.quantityOwned;
    }

    const unitNounSingular = 'share';
    const unitNounPlural = 'shares';
    const noun = this.state.currentValue > 1 ? unitNounPlural : unitNounSingular;

    return (
      <Spacing top={2}>
      <Row>
        <Col width={4}>
          {limit > 1 && (
            <React.Fragment>
              <Row>
                <Col width={6}>
                  <span>Available cash</span>
                </Col>
                <Col width={6}>
                  <Currency n={availableCash} />
                </Col>
              </Row>
              <Row>
                <Col width={6}>
                  <span>Pouch space</span>
                </Col>
                <Col width={6}>
                  <Currency hidePrefix n={pouchSpace} />
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Col>

        <Col width={8}>
          {currentValue > 0 && (
            <Row>
                <strong>{verb} <Currency hidePrefix n={this.state.currentValue} />&nbsp;
                  {noun} of {item.title} for <Currency n={this.state.currentValue * item.value} /></strong>
            </Row>
          )}
          {!currentValue && (
            <Row>
              <strong>{verb} {item.title}</strong>
            </Row>
          )}
          {limit > 1 && (<Row>
            <RangeWithPreview textInputWidth={limit.toString().length + 1} value={this.state.currentValue} onChange={this.onChangeQuantity} min={0} max={limit} />
          </Row>)}

          <Row>
            <Col width={12}>
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
            </Col>
          </Row>
        </Col>
      </Row>
      </Spacing>
    )
  }
};
