import React from 'react';
import FullPageMenu from './FullPageMenu';
import { Row, Col, PageWidthContainer } from './Grid';
import Image from './Image';
import Spacing from './Spacing';
import PlainButton from './PlainButton';

const players = [
  {
    id: 'rene',
    name: 'Rene',
    occupation: 'Artist',
    description: 'About Rene',
    image: './images/rene.jpg',
  },
  {
    id: 'player2',
    name: 'Player 2',
    occupation: 'Player2 occupation',
    description: 'About Player 2',
    image: './images/michelle.jpg',
  },
  {
    id: 'player3',
    name: 'Player 3',
    occupation: 'Player3 occupation',
    description: 'About Player 3',
    image: './images/player.jpg',
  },
  {
    id: 'player4',
    name: 'Player 4',
    occupation: 'Player4 occupation',
    description: 'About Player 4',
    image: './images/player.jpg',
  }
];

// TODO: Move to header
const headerStyle = {
  1: {
    fontSize: '1.5rem',
    lineHeight: '125%',
  },
  2: {
    fontSize: '1.25rem',
  },
  3: {
    fontSize: '1rem'
  }
};
const Header = ({ children, level }) => (
  <strong style={headerStyle[level]}>
    {children}
  </strong>
);

const textStyle = {
  'regular': {}
};
const Text = ({ children, size }) => (
  <span style={textStyle[size]}>
    {children}
  </span>
);
Text.defaultProps = {
  size: 'regular'
};

const STEP_INTRO = 'intro';
const STEP_SELECT = 'select';

export default class PlayerSelect extends React.Component {
  state = {
    //step: STEP_INTRO
    step: STEP_SELECT,
    currentPlayer: players[0]
  };

  renderIntro = () => {
    return (
      <React.Fragment>
        <Row>
          <Col width={12}>
            <Header level={1}>
              Can you become a billionaire in your lifetime?
            </Header>
          </Col>
        </Row>
        <Row>
          <Col width={12}>
            <button onClick={() => this.setState({
              step: STEP_SELECT
            })}>Play</button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  renderSelect = () => {
    const { currentPlayer } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col width={12}>
            <Spacing top={1}>
              <Header level={1}>
                Select a character
              </Header>
            </Spacing>
          </Col>
        </Row>
        <Row>
          <Col width={5}>
            <Image src={currentPlayer.image} width="100%" height="15rem" cover/>
          </Col>
          <Col width={7}>
            <Spacing left={1}>
              <Spacing>
                <Header level={2}>{currentPlayer.name}</Header>
              </Spacing>
              <Spacing bottom={2}>
                <Header level={3}>Occupation: {currentPlayer.occupation}</Header>
              </Spacing>
              <Text>
                {currentPlayer.description}
              </Text>
            </Spacing>
          </Col>
        </Row>
        <Row>
          {players.map(player => (
            <Col width={3}>
              <PlainButton style={{
                cursor: 'pointer',
                width: '100%',
                height: '100%',
              }} onClick={() => this.setState({
                currentPlayer: player
              })}>
                <Image src={player.image} width="100%" height="5rem" cover />
              </PlainButton>
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { step } = this.state;
    return (
      <FullPageMenu>
        <PageWidthContainer>
          {step === STEP_INTRO && this.renderIntro()}
          {step === STEP_SELECT && this.renderSelect()}
        </PageWidthContainer>
      </FullPageMenu>
    );
  }
}