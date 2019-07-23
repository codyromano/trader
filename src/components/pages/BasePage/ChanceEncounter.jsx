import React from 'react';
import Image from './Image';
import { Row, Col } from './Grid';

export default class ChanceEncounter extends React.PureComponent {
  render() {
    const {
      title,
      description,
      imageSrc,
      onAccept,
      onReject,
      rejectText,
      acceptText,
      acceptDisabled,
      acceptDisabledText,
      rejectDisabled
    } = this.props;

    return (
      <Row>
        <Col width={12}>
        <Image src={imageSrc} width="100%" height="50vh" />
        <h1>{title}</h1>
        <p>{description}</p>

        {acceptDisabledText && (
          <p style={{color: 'red'}}>
            {acceptDisabledText}
          </p>
        )}

        {!rejectDisabled && 
          <React.Fragment>
            <button onClick={onReject}>{rejectText}</button>{' '}
          </React.Fragment>
        }
        <button onClick={onAccept} disabled={acceptDisabled}>{acceptText}</button>
        </Col>
      </Row>
    )
  }
}