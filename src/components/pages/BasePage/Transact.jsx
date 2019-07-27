import React from 'react';
import { Row, Col, PageWidthContainer } from './Grid';
import Currency from './Currency';
import RangeWithPreview from './RangeWithPreview';
import Spacing from './Spacing';
import Notice from './Notice';
import { Text, Header } from './Typography';
import Button from './Button';

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
    });
  };

  transactSingleShare = () => {
    const { item, transactionType } = this.props;
    this.props.onTransact(transactionType, item, 1);
  };

  renderCannotProcessTransactionMessage = () => {
    const { pouchSpace, limit, transactionType } = this.props;

    if (transactionType === 'buy' && !pouchSpace) {
      return (
        <Notice>
          You can't buy anything because your item pouch is full. Sell something or buy a bigger
          pouch.
        </Notice>
      );
    }
    return null;
  };

  renderStatsBar = () => {
    const { availableCash, pouchSpace } = this.props;

    return (
      <Row>
        <Col width={12}>
          <Spacing inline right={1}>
            <strong>
              <Text size="small">Cash</Text>
            </strong>
          </Spacing>

          <Spacing inline right={2}>
            <Text size="small">
              <Currency n={availableCash} />
            </Text>
          </Spacing>

          <Spacing inline right={1}>
            <strong>
              <Text size="small">Pouch space</Text>
            </strong>
          </Spacing>

          <Text size="small">
            <Currency hidePrefix n={pouchSpace} />
          </Text>
        </Col>
      </Row>
    );
  };

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

    const cannotProcessTransaction = this.renderCannotProcessTransactionMessage();

    if (cannotProcessTransaction) {
      return (
        <PageWidthContainer>
          <Row>
            <Col width={12}>
              <Spacing top={1} bottom={1}>
                {cannotProcessTransaction}
              </Spacing>
              <Button onClick={this.props.onCancel}>Back to trading screen</Button>
            </Col>
          </Row>
        </PageWidthContainer>
      );
    }

    return (
      <PageWidthContainer>
        <Spacing top={2}>
          <Row>
            <Col width={12}>{this.renderStatsBar()}</Col>
          </Row>
          <Row>
            <Col width={12}>
              {currentValue > 0 && (
                <Row>
                  <strong>
                    {verb} <Currency hidePrefix n={this.state.currentValue} />
                    &nbsp;
                    {noun} of {item.title} for <Currency n={this.state.currentValue * item.value} />
                  </strong>
                </Row>
              )}
              {!currentValue && (
                <Row>
                  <strong>
                    {verb} {item.title}
                  </strong>
                </Row>
              )}

                <Row>
                  <RangeWithPreview
                    textInputWidth={limit.toString().length + 1}
                    value={this.state.currentValue}
                    onChange={this.onChangeQuantity}
                    min={0}
                    max={limit}
                  />
                </Row>

              <Row>
                <Col width={12}>
                  <Spacing right={1}>
                    
                  <Button muted onClick={this.props.onCancel}>Cancel</Button>

                  {this.state.currentValue > 0 && (
                    <Button
                      disabled={this.props.transactDisabled}
                      onClick={() =>
                        this.props.onTransact(transactionType, item, this.state.currentValue)
                      }
                    >
                      {verb}
                    </Button>
                  )}
                  </Spacing>
                </Col>
              </Row>
            </Col>
          </Row>
        </Spacing>
      </PageWidthContainer>
    );
  }
}
