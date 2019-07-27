import React from 'react';
import Currency from './Currency';
import { MILLION } from './constants';

const chanceEncounters = {
  'unexpectedExpense': {
    title: () => 'Unexpected healthcare expense',
    imageSrc: () => 'https://cdn.aarp.net/content/dam/aarp/money/taxes/2018/01/1140-tax-law-medical-expense.imgcache.reva46d93de89047fbe30eabbf2dc48a06e.jpg',
    shouldOccur: () => Math.random() <= .9,
    description: ({ cash, interestRate }) => (
      <React.Fragment>
        <p>
          An unexpected medical expense set you back <Currency n={Math.max(25, cash * .05)} />.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: () => false,
    acceptText: () => 'Bummer...',
    rejectText: () => ``,
    onAccept({ cash }) {
      return {
        cash: cash - Math.max(25, cash * .05)
      };
    },
    onReject: () => {},
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
  },
  'lowRate': {
    title: () => 'Interest rates hit historic lows!',
    imageSrc: () => 'https://www.nreionline.com/sites/nreionline.com/files/uploads/2015/07/interest-rate_0.jpg',
    shouldOccur: ({ interestRate }) => (
      Math.random() <= .05 &&
      interestRate !== 0.05
    ),
    description: ({ cash, interestRate }) => (
      <React.Fragment>
        <p>
          Money is cheap! Borrow with %5 interest.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: () => false,
    acceptText: () => 'Sweet!',
    rejectText: () => ``,
    onAccept() {
      return {
        interestRate: 0.05
      };
    },
    onReject: () => {},
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
  },

  'highRate': {
    title: () => 'Interest rates skyrocket!',
    imageSrc: () => 'https://www.nreionline.com/sites/nreionline.com/files/uploads/2015/07/interest-rate_0.jpg',
    shouldOccur: ({ interestRate }) => (
      Math.random() <= .05 &&
      interestRate !== 0.30
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          Money is expensive!! Borrow with %30 interest. :(
        </p>
      </React.Fragment>
    ),
    acceptDisabled: () => false,
    acceptText: () => 'Oh snap...',
    rejectText: () => ``,
    onAccept() {
      return {
        interestRate: 0.30
      };
    },
    onReject: () => {},
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
  },

  'normalRate': {
    title: () => 'Interest rates stabilize',
    imageSrc: () => 'https://www.nreionline.com/sites/nreionline.com/files/uploads/2015/07/interest-rate_0.jpg',
    shouldOccur: ({ interestRate }) => (
      Math.random() <= .15 &&
      interestRate !== 0.15
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          Interest rates are at 15%...pretty much standard.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: () => false,
    acceptText: () => 'Okay',
    rejectText: () => ``,
    onAccept() {
      return {
        interestRate: 0.15
      };
    },
    onReject: () => {},
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
  },

  'bulletProof': {
    title: () => 'Bullet-proof vest',
    imageSrc: () => 'https://collegian.com/wp-content/uploads/2019/06/Bulletproof-Vest.jpg',
    shouldOccur: () => (
      Math.random() <= .10
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          A bullet-proof vest guarantees that if you are robbed at gunpoint, you can successfully run away.</p>
        <p>
          The item is consumable, meaning that it only works <strong>one time</strong>.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: ({ cash }) => cash < Math.max(cash * .75, 12500),
    acceptText: ({ cash }) => (
      <React.Fragment>
        Buy vest for <Currency n={Math.max(cash * .75, 12500)} />
      </React.Fragment>
    ),
    rejectText: () => `Don't buy the vest`,
    onAccept({ vests, cash }) {
      cash -= Math.max(cash * .75, 12500);
      vests = (vests || 0) + 1;
      return {
        cash, vests
      };
    },
    onReject: () => {},
    acceptDisabledText: () => `You can't afford to buy a vest. Maybe later...`,
    rejectDisabled: () => false,
  },

  'gamble1': {
    title: () => 'Play roulette in Vegas?',
    imageSrc: () => 'https://objects.kaxmedia.com/auto/o/2010/c13f09b6b7.jpeg',
    shouldOccur: () => (
      Math.random() <= .10
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          This roulette table is <strong>low stakes</strong>...A seat at the table costs <Currency n={100} />.
        </p>
        <p>
          Land on <strong>black</strong> to earn <Currency n={cash * .20} /> cash.
        </p>
        <p>
          If you land on <strong style={{color: 'red'}}>red</strong>, you'll take on <Currency n={cash * .20} /> in debt.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: ({ cash }) => cash < 100,
    acceptText: () => `Bet on black`,
    rejectText: () => `Play it safe...walk away`,
    onAccept({ cash, debt }) {
      cash -= 100;

      if (Math.random() < .50) {
        cash*= 1.2;
      } else {
        debt += cash * 0.2;
      }
      return {
        cash, debt
      };
    },
    onReject: () => {},
    acceptDisabledText: () => `You can't afford to gamble at this table. Maybe later...`,
    rejectDisabled: () => false,
  },

  'gamble2': {
    title: () => 'Play roulette in Vegas?',
    imageSrc: () => 'https://objects.kaxmedia.com/auto/o/2010/c13f09b6b7.jpeg',
    shouldOccur: () => (
      Math.random() <= .05
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          This roulette table is <strong>medium stakes</strong>...A seat at the table costs <Currency n={10000} />.
        </p>
        <p>
          Land on <strong>black</strong> to earn <Currency n={10000 + (cash * .30)} /> cash.
        </p>
        <p>
          If you land on <strong style={{color: 'red'}}>red</strong>, you'll take on <Currency n={cash * .50} /> in debt.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: ({ cash }) => cash < 10000,
    acceptText: () => `Bet on black`,
    rejectText: () => `Play it safe...walk away`,
    onAccept({ cash, debt }) {
      cash -= 10000;
      
      if (Math.random() < .50) {
        cash += 10000;
        cash*= 1.3;
      } else {
        debt += cash * 0.3;
      }
      return {
        cash, debt
      };
    },
    onReject: () => {},
    acceptDisabledText: () => `You can't afford to gamble at this table. Maybe later...`,
    rejectDisabled: () => false,
  },

  'gamble3': {
    title: () => 'Play roulette in Vegas?',
    imageSrc: () => 'https://objects.kaxmedia.com/auto/o/2010/c13f09b6b7.jpeg',
    shouldOccur: () => (
      Math.random() <= .05
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>
          This roulette table is <strong>HIGH stakes</strong>...A seat at the table costs <Currency n={MILLION} />.
        </p>
        <p>
          Land on <strong>black</strong> to earn <Currency n={MILLION + cash * .50} /> cash.
        </p>
        <p>
          If you land on <strong style={{color: 'red'}}>red</strong>, you'll take on <Currency n={cash * .80} /> in debt.
        </p>
      </React.Fragment>
    ),
    acceptDisabled: ({ cash }) => cash < 10000,
    acceptText: () => `Bet on black`,
    rejectText: () => `Play it safe...walk away`,
    onAccept({ cash, debt }) {
      cash -= MILLION;

      if (Math.random() < .50) {
        cash += MILLION;
        cash*= 1.5;
      } else {
        debt += cash * 0.8;
      }
      return {
        cash, debt
      };
    },
    onReject: () => {},
    acceptDisabledText: () => `You can't afford to gamble at this table. Maybe later...`,
    rejectDisabled: () => false,
  },

  'donateNonProfit': {
    title: () => 'Donate to a nonprofit?',
    imageSrc: () => 'https://thebluepaper.com///wp-content/uploads/2014/09/Womankind-Staff-Ovarian-Cancer-Awareness-2014.jpg',
    shouldOccur: ({ increaseChanceOfKindStranger }) => (
      Math.random() <= .05 &&
      increaseChanceOfKindStranger !== .10
    ),
    description: ({ cash }) => (
      <React.Fragment>
        <p>Donate $5,000 to a non-profit and increase the chances of meeting a kind stranger by 10%.</p>
      </React.Fragment>
    ),
    acceptDisabled: ({ cash }) => cash < 5000,
    acceptText: () => `Donate $5,000`,
    rejectText: () => `Respectfully Decline`,
    onAccept() {
      return {
        increaseChanceOfKindStranger: .10
      };
    },
    
    onReject: () => {},
    acceptDisabledText: () => `You can't afford this right now. Maybe later...`,
    rejectDisabled: () => false,
  },

  'robbery': {
    title: () => 'Robbers confront you in an alleyway',
    imageSrc: () => 'https://www.moneycrashers.com/wp-content/uploads/2018/10/silhouette-man-in-hoodie-sweatshirt-dark-alley-1068x713.jpg',
    shouldOccur: ({ day }) => Math.random() <= .10,
    description: ({ vests }) => {
      if (vests) {
        return (
          <p>Luckily, you own a bullet-proof vest!</p>
        );
      }
      return (
        <p>They're demanding your cash. You can try to run or fight.</p>
      );
    },
    acceptText: ({ vests }) => vests ? `Walk away` : `Try to fight`,
    rejectText: () => `Try to run`,
    onAccept(state) {
      if (state.vests) {
        return state;
      }

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
    rejectDisabled: ({ vests }) => !!vests,
  },

  'kindStranger': {
    title: () => 'You meet a kind stranger',
    imageSrc: () => '/images/kind-stranger.jpg',
    shouldOccur: ({ day, increaseChanceOfKindStranger }) => (
      Math.random() <= .20 + (increaseChanceOfKindStranger || 0)
    ),
    description: ({ cash }) => <React.Fragment>
      She gives you <Currency n={Math.max(cash * .10, 10)} />.
    </React.Fragment>,
    acceptText: ({ cash }) => `Accept $${Math.max(cash * .10, 10)} gift`,
    onAccept(state) {
      let cash = state.cash;
      cash += Math.max(cash * .10, 10);
      return { cash };
    },
    acceptDisabled: () => false,
    acceptDisabledText: () => null,
    rejectDisabled: () => true,
    rejectText: () => ''
  }
};

export default chanceEncounters;
