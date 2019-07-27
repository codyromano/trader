import React from 'react';
import { Text } from './Typography';

export default [
  {
    id: 'rene',
    name: 'Rene',
    occupation: 'Artist',
    description: (
      <React.Fragment>
        Rene has exclusive access to{' '}
        <Text size="small" accent>
          fine art
        </Text>
        , a lucrative commodity for trading, and his low-stress career affords a{' '}
        <Text size="small" accent>
          long life expectancy
        </Text>
        , but he has{' '}
        <Text size="small" danger>
          bad financial luck
        </Text>
        .
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
        Unlike other players, Michelle{' '}
        <Text size="small" accent>
          can't be injured
        </Text>{' '}
        during chance encounters, and and she may invest in a valuable{' '}
        <Text size="small" accent>
          medical practice
        </Text>
        . However, she starts the game{' '}
        <Text size="small" danger>
          at an older age
        </Text>{' '}
        and with{' '}
        <Text size="small" danger>
          more debt
        </Text>
        .
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
