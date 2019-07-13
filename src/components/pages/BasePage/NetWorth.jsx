import React from 'react';
import { Row, Col } from './Grid';
import Currency from './Currency';

export default class NetWorth extends React.PureComponent {
  style = {
    backgroundColor: '#fff',
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
            <div style={{borderTop: 'solid #555 1px', width: '100px'}}>
                &nbsp;<Currency n={cash - debt} />
            </div>
          </Row>
        </div>
      );
    }
    return (<Row collapsed>
    <strong>Your net worth: <Currency n={cash} /></strong>
    </Row>);
  }
}