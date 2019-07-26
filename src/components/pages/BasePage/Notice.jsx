import React from 'react';
import { Row, Col } from './Grid';
import { Text } from './Typography';

export default class Notice extends React.PureComponent {
  style = {
    backgroundColor: 'rgba(210, 218, 226,1.0)',
    borderRadius: '0.25rem',
    padding: '0.75rem',
  };

  render() {
    return (
      <Row>
        <div style={this.style}>
          <Text size="small">{this.props.children}</Text>
        </div>
      </Row>
    );
  }
}
