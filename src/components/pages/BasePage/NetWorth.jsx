import React from 'react';
import { Row, Col } from './Grid';
import Currency from './Currency';
import Spacing from './Spacing';

export default class NetWorth extends React.PureComponent {
  style = {
    lineHeight: '200%',
    color: '#000',
  };

  render() {
    const { debt, cash } = this.props;
    if (debt > 0) {
      return (
        <div style={this.style}>
          <Row collapsed>
            <strong>Your net worth</strong>
          </Row>
          <Row collapsed>
            <Currency n={cash} /> &nbsp; Cash
          </Row>
          <Row collapsed>
            -<Currency n={debt} /> &nbsp; Debt
          </Row>
          <Row collapsed>
            <div style={{ borderTop: 'solid #555 1px', width: '100px' }}>
              &nbsp;
              <Currency n={cash - debt} />
            </div>
          </Row>
        </div>
      );
    }
    return (
      <Row collapsed>
        <strong style={{ color: '#000' }}>
          <Spacing bottom={1}>
            Your net worth is <Currency n={cash} />
          </Spacing>
          Congratulations...you have no debt. 🙂
        </strong>
      </Row>
    );
  }
}
