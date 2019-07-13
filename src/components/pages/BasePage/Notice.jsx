import React from 'react';
import { Row, Col } from './Grid';

export default class Notice extends React.PureComponent {
  style = {
    backgroundColor: '#efe',
    padding: '0.5rem'
  };

  render() {
    return (
      <Row>
        <div style={this.style}>
            {this.props.children}
        </div>
      </Row>
    );
  }
}