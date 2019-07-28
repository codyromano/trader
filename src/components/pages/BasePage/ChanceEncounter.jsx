import React from 'react';
import Image from './Image';
import { Header } from './Typography';
import { Row, Col, PageWidthContainer } from './Grid';

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
      <PageWidthContainer>
      <Row>
        <Col width={12}>
        <Image src={imageSrc} width="100%" height="50vh" />
        <Header level={1}>{title}</Header>
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
      </PageWidthContainer>
    )
  }
}