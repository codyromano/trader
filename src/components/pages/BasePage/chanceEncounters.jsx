import React from 'react';
import Currency from './Currency';

const chanceEncounters = {
  'robbery': {
    title: () => 'Robbers confront you in an alleyway',
    imageSrc: () => 'https://www.moneycrashers.com/wp-content/uploads/2018/10/silhouette-man-in-hoodie-sweatshirt-dark-alley-1068x713.jpg',
    shouldOccur: ({ day }) => Math.random() <= .25,
    description: () => `They're demanding your cash. You can try to run or fight.`,
    acceptText: () => `Try to fight`,
    rejectText: () => `Try to run`,
    onAccept(state) {
      let cash = state.cash;

      if (Math.random() <= 0.5) {
        cash *= 0.25;
      }
      return { cash };
    },
    onReject: (state) => {
      let cash = state.cash;

      if (Math.random() <= 0.5) {
        cash *= 0.25;
      }
      return { cash };
    },
    acceptDisabled: () => false,
    acceptDisabledText: () => null,
    rejectDisabled: () => false,
  },

  'kindStranger': {
    title: () => 'You meet a kind stranger',
    imageSrc: () => '/images/kind-stranger.jpg',
    shouldOccur: ({ day }) => Math.random() <= .20,
    description: ({ cash }) => <React.Fragment>
      She gives you <Currency n={Math.min(cash * .50, 250)} />.
    </React.Fragment>,
    acceptText: ({ cash }) => `Accept $${Math.min(cash * .50, 250)} gift`,
    onAccept(state) {
      let cash = state.cash;
      cash += Math.min(cash * .50, 250);
      return { cash };
    },
    acceptDisabled: () => false,
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
    rejectText: () => ''
  }
};

export default chanceEncounters;
