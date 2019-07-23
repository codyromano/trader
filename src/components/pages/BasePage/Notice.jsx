import React from 'react';
import { Row, Col } from './Grid';

export default class Notice extends React.PureComponent {
  style = {
    backgroundColor: 'rgba(210, 218, 226,1.0)',
    borderRadius: '0.25rem',
    padding: '0.75rem'
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