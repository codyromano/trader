import React from 'react';
import createUniqueId from 'uuid/v1';
import FullPageMenu from './FullPageMenu';
import { Row, Col, PageWidthContainer } from './Grid';
import Image from './Image';
import Spacing from './Spacing';
import PlainButton from './PlainButton';
import Button from './Button';
import { Header, Text } from './Typography';
import { withGameDatabase } from './withDatabase';
import players from './players';

const STEP_INTRO = 'intro';
const STEP_SELECT = 'select';

class SerializableGameObject {
  attributes = {};

  setAttribute(attributeName, value) {
    this.attributes[attributeName] = value;
  }
  setAttributes(attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      this.setAttribute(key, value);
    }
  }
  getAttribute = (attributeName) => this.attributes[attributeName];
  toString = () => JSON.stringify(this.attributes);

  deserialize = (serialized) => {
    try {
      const parsed = JSON.parse(serialized);
      Object.assign(this.attributes, parsed);
    } catch (error) {
      throw new Error('SerializableGameObject - cannot deserialize: ' + serialized);
    }
  };
}

class Player extends SerializableGameObject {
  constructor() {
    super();
    this.setAttributes({
      age: 18,
      netWorth: 50,
    });
  }
}

class Michelle extends Player {
  constructor() {
    super();
    this.setAttribute();
  }
}

class PlayerSelect extends React.Component {
  state = {
    //step: STEP_INTRO
    step: STEP_SELECT,
  };

  renderIntro = () => {
    return (
      <React.Fragment>
        <Row>
          <Col width={12}>
            <Header level={1}>Can you become a billionaire in your lifetime?</Header>
          </Col>
        </Row>
        <Row>
          <Col width={12}>
            <button
              onClick={() =>
                this.setState({
                  step: STEP_SELECT,
                })
              }
            >
              Play
            </button>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  getCurrentPlayer = () => {
    return (
      players.find((player) => player.id === this.props.databaseValues['playerTypeId']) || null
    );
  };

  confirmPlayerSelection = () => {
    const currentPlayer = this.getCurrentPlayer();
    const startingAges = {
      rene: 16,
      michelle: 30,
    };

    this.props.setItem('player', {
      id: createUniqueId(),
      typeId: currentPlayer.id,
      startingAge: startingAges[currentPlayer.id],
      activeTasks: {},
      cash: 30,
    });
    this.props.history.push('/');
  };

  renderSelect = () => {
    const savedPlayer = players.find(
      (player) => player.id === this.props.databaseValues['playerTypeId'],
    );
    const currentPlayer = savedPlayer || {
      name: 'Select a character',
      image: './images/down.png',
      occupation: '',
      description: 'Select a character from the menu below.',
    };

    const extraProps = {
      [currentPlayer.occupation && 'cover']: true,
    };

    return (
      <React.Fragment>
        <Row>
          <Col width={4}>
            <Image src={currentPlayer.image} width="100%" height="10rem" {...extraProps} />
          </Col>
          <Col width={8}>
            <Spacing left={1}>
              <Spacing>
                <Header level={1}>{currentPlayer.name}</Header>
              </Spacing>
              <Spacing bottom={1}>
                <Header level={3}>{currentPlayer.occupation}</Header>
              </Spacing>
              <Text size="small">{currentPlayer.description}</Text>

              {currentPlayer.occupation.length > 0 && (
                <Spacing top={1}>
                  <Button onClick={this.confirmPlayerSelection}>
                    Play as {currentPlayer.name}
                  </Button>
                </Spacing>
              )}
            </Spacing>
          </Col>
        </Row>
        <Row>
          {players.map((player) => (
            <Col width={3} key={player.id}>
              <PlainButton
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => this.props.setItem('playerTypeId', player.id)}
              >
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
          <Spacing top={1}>
            {step === STEP_INTRO && this.renderIntro()}
            {step === STEP_SELECT && this.renderSelect()}
          </Spacing>
        </PageWidthContainer>
      </FullPageMenu>
    );
  }
}

export default withGameDatabase(PlayerSelect, ['playerTypeId']);
