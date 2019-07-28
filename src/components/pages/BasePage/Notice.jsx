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
    const { danger } = this.props;
    let style = this.style;

    if (danger) {
      style = {
        ...this.style,
        backgroundColor: '#ff5e57'
      };
    }
    return (
      <Row>
        <div style={style}>
          <Text size="small">{this.props.children}</Text>
        </div>
      </Row>
    );
  }
}
