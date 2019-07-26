import React from 'react';
import FullPageMenu from './FullPageMenu';
import { Row, Col, PageWidthContainer } from './Grid';
import Image from './Image';
import Spacing from './Spacing';
import PlainButton from './PlainButton';
import Button from './Button';
import { Header, Text } from './Typography';
import { withGameDatabase } from './withDatabase';

const players = [
  {
    id: 'rene',
    name: 'Rene',
    occupation: 'Artist',
    description: (
      <React.Fragment>
        Rene has exclusive access to <Text accent>fine art</Text>, a lucrative commodity for
        trading, and his low-stress career affords a <Text accent>long life expectancy</Text>, but
        he has <Text danger>bad financial luck</Text>.
      </React.Fragment>
    ),
    image: './images/rene.jpg',
  },
  {
    id: 'michelle',
    name: 'Michelle',
    occupation: 'Surgeon',
    description: (
      <React.Fragment>
        Unlike other players, Michelle <Text accent>can't be injured</Text> during chance
        encounters, and and she may invest in a valuable <Text accent>medical practice</Text>.
        However, she starts the game <Text danger>at an older age</Text> and with{' '}
        <Text danger>more debt</Text>.
      </React.Fragment>
    ),
    image: './images/michelle.jpg',
  },
  {
    id: 'player3',
    name: 'Player 3: Coming soon',
    occupation: '',
    description: `Hang tight...I'm working to add more players with special abilities to the game. :)`,
    image: './images/player.jpg',
    placeholder: true,
  },
  {
    id: 'player4',
    name: 'Player 4: Coming soon',
    occupation: '',
    description: `Hang tight...I'm working to add more players with special abilities to the game. :)`,
    image: './images/player.jpg',
  },
];

const STEP_INTRO = 'intro';
const STEP_SELECT = 'select';

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
          <Col width={5}>
            <Image src={currentPlayer.image} width="100%" height="15rem" {...extraProps} />
          </Col>
          <Col width={7}>
            <Spacing left={1}>
              <Spacing>
                <Header level={1}>{currentPlayer.name}</Header>
              </Spacing>
              <Spacing bottom={2}>
                <Header level={3}>{currentPlayer.occupation}</Header>
              </Spacing>
              <Text>{currentPlayer.description}</Text>

              {currentPlayer.occupation.length > 0 && (
                <Spacing top={1}>
                  <Button>Play as {currentPlayer.name}</Button>
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
