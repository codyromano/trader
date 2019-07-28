import React from 'react';
import PropTypes from 'prop-types';
import TabMenu, { tabs } from './TabMenu';
import Transact from './Transact';
import Bank from './Bank';
import { Row, Col, PageWidthContainer } from './Grid';
import { Header, Text } from './Typography';
import Currency from './Currency';
import Notice from './Notice';
import Travel from './Travel';
import Image from './Image';
import Spacing from './Spacing';
import Button from './Button';
import ProfileBar from './ProfileBar';
import ChanceEncounter from './ChanceEncounter';
import FullPageMenu from './FullPageMenu';
import chanceEncounters from './chanceEncounters.jsx';
import { withGameDatabase } from './withDatabase';
import Help from './Help';
import './BasePage.css';
import {
  itemPouches,
  purchasableItems,
  MILLION,
  STARTING_CASH,
  STARTING_DEBT,
  TRAVEL_COST,
  CITIES,
} from './constants';
import CityMenu from './CityMenu';
import players from './players';

const random = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

class PurchasableItem extends React.PureComponent {
  render() {
    const {
      imageSrc,
      value,
      buyDisabled,
      sellDisabled,
      quantity,
      onBuyPressed,
      onSellPressed,
    } = this.props;
    return (
      <Row>
        <Col width="5">
          <Image height="1rem" width="1rem" src={imageSrc} />
          &nbsp;
          <Text size="small">
            {this.props.title}
            {quantity > 0 && <React.Fragment>&nbsp;({quantity})</React.Fragment>}
          </Text>
        </Col>

        <Col width="3">
          <Text size="small">
            <Currency n={value} />
          </Text>
        </Col>
        {/*
        <Col width="3">{quantity}</Col>
        */}
        <Col width="4">
          <Button small muted onClick={() => onBuyPressed(this.props)} disabled={buyDisabled}>
            Buy
          </Button>&nbsp;
          {!sellDisabled && <Button small onClick={() => onSellPressed(this.props)}>Sell</Button>}
        </Col>
      </Row>
    );
  }
}

class BasePage extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Should not have to do defensive check here
    const player = this.getCurrentPlayer(props) || {type: { id: 0}};

    this.state = {
      day: 1,
      age: player.startingAge,
      chanceEncounter: null,
      cash: STARTING_CASH,
      debt: STARTING_DEBT,
      interestRate: 0.15,
      itemPouch: 25,
      currentCityId: 'sea',
      selectedTabId: tabs[0].id,
      menuScreen: null,
      itemsOwned: {},
      items: purchasableItems
        .map((item) => {
          item.value = item.min + Math.random() * (item.max - item.min);
          return item;
        })
        .filter(({ specificToPlayer }) => [undefined, player.type.id].includes(specificToPlayer)),
    };
  }

  getCurrentPlayer = (props = this.props) => {
    const { player } = props.databaseValues;
    if (player) {
      const type = players.find((playerType) => playerType.id === player.typeId);
      return {
        ...player,
        type,
      };
    }
    return null;
  };

  playerIsSelected = () => {
    return !!this.props.databaseValues.player;
  };

  // TODO: Explore using hooks
  componentDidMount() {
    // Force player detection
    if (!this.playerIsSelected()) {
      this.props.history.push('player');
    }
  }

  getItemSpaceUsed = () => {
    return Object.values(this.state.itemsOwned).reduce((total, quantity) => total + quantity, 0);
  };

  onCityChange = (city) => {
    if (this.state.cash >= TRAVEL_COST) {
      const shuffledEncounters = Object.keys(chanceEncounters).sort((a, b) =>
        Math.random() > 0.5 ? -1 : 1,
      );

      let chanceEncounter = null;
      for (const encounterId of shuffledEncounters) {
        if (shuffledEncounters[encounterId].shouldOccur(this.state)) {
          chanceEncounter = encounterId;
          break;
        }
      }

      this.setState((state) => ({
        day: state.day + 1,
        cash: state.cash - TRAVEL_COST,
        currentCityId: city.id,
        debt: 250,
        chanceEncounter,
        age: state.age + 0.5,
      }));
    }
  };

  onTabSelected = (tab) => {
    this.setState({
      selectedTabId: tab.id,
    });
  };

  onBuyItem = (item) => {
    this.setState({
      menuScreen: 'transaction',
      transactionType: 'buy',
      transactionItemId: item.id,
    });
  };

  onSellItem = (item) => {
    this.setState((state) => ({
      menuScreen: 'transaction',
      transactionType: 'sell',
      transactionItemId: item.id,
    }));
  };

  onCancelTransaction = () => {
    this.setState({
      menuScreen: '',
      transactionType: null,
      transactionItemId: null,
    });
  };

  onTransact = (type, item, quantity) => {
    this.setState((state) => {
      let owned = state.itemsOwned[item.id] || 0;
      let cash = state.cash;

      if (type === 'buy') {
        owned += quantity;
        cash -= quantity * item.value;
      } else if (type === 'sell') {
        owned -= quantity;
        cash += quantity * item.value;
      }

      return {
        itemsOwned: {
          ...state.itemsOwned,
          [item.id]: owned,
        },
        cash,
        menuScreen: '',
        transactionType: null,
        transactionItemId: null,
      };
    });
  };

  onCitySelected = () => {
    this.setState((state) => {
      const priceSwing = 0.5;
      const chanceOfPriceSwing = Math.random() <= 0.33;
      const evenSplitChance = Math.random() <= 0.5;

      let priceSplitNews = null;

      const items = state.items.map((item) => {
        item.value = Math.round(item.min + (item.max - item.min) * Math.random());
        return item;
      });

      if (chanceOfPriceSwing) {
        const item = random(items);
        const multiplier = evenSplitChance ? 0.5 : 1.75;

        priceSplitNews = {};

        if (evenSplitChance) {
          priceSplitNews['title'] = `${item.title} hits rock bottom`;
          item.value = item.min * priceSwing;
        } else {
          priceSplitNews['title'] = `${item.title} skyrockets!`;
          item.value = item.max * (1 + priceSwing);
        }

        priceSplitNews['imageSrc'] = item.imageSrc;
      }

      const shuffledEncounters = Object.keys(chanceEncounters).sort((a, b) =>
        Math.random() > 0.5 ? -1 : 1,
      );

      let chanceEncounter = null;
      for (const encounterId of shuffledEncounters) {
        if (chanceEncounters[encounterId].shouldOccur(this.state)) {
          chanceEncounter = encounterId;
          break;
        }
      }

      return {
        ...state,
        priceSplitNews,
        cash: state.cash - TRAVEL_COST,
        debt: Math.round(state.debt * (1 + state.interestRate)),
        items,
        selectedTabId: 'spend',
        menuScreen: '',
        chanceEncounter,
        age: state.age + 0.25,
      };
    });
  };

  onDismissNews = () => {
    this.setState({
      priceSplitNews: null,
    });
  };

  onPayoffDebt = (amount) => {
    this.setState((state) => ({
      debt: state.debt - amount,
      cash: state.cash - amount,
      selectedTabId: 'spend',
    }));
  };

  onBorrow = (amount) => {
    this.setState((state) => ({
      cash: state.cash + amount,
      debt: state.debt + amount,
      selectedTabId: 'spend',
    }));
  };

  onCancelPayoff = () => {
    this.setState({
      selectedTabId: 'spend',
    });
  };

  getNextPouchSpecs = () => {
    const item = itemPouches.find((pouch) => pouch.amount > this.state.itemPouch);
    if (item) {
      return {
        nextPouchAmount: item.amount,
        nextPouchCost: item.cost,
      };
    }
    return null;
  };

  onRejectChanceEncounter = () => {
    const newState = chanceEncounters[this.state.chanceEncounter].onReject(this.state);
    this.setState({
      ...newState,
      chanceEncounter: null,
    });
  };

  upgradePouch = () => {
    const item = itemPouches.find((pouch) => pouch.amount > this.state.itemPouch);
    this.setState((state) => ({
      cash: state.cash - item.cost,
      itemPouch: item.amount,
    }));
  };

  onAcceptChanceEncounter = () => {
    const newState = chanceEncounters[this.state.chanceEncounter].onAccept(this.state);
    this.setState({
      ...newState,
      chanceEncounter: null,
    });
  };

  onPressQuit = () => {
    this.props.setItem('player', null);
    this.props.setItem('playerTypeId', null);
    this.props.history.push('player');
  };

  render() {
    const {
      chanceEncounter,
      priceSplitNews,
      cash,
      debt,
      selectedTabId,
      menuScreen,
      transactionType,
      interestRate,
      items,
      transactionItemId,
    } = this.state;

    if (!this.playerIsSelected()) {
      return null;
    }

    if (chanceEncounter) {
      const chanceEncounterDefinition = chanceEncounters[chanceEncounter];

      return (
        <ChanceEncounter
          title={chanceEncounterDefinition.title(this.state)}
          imageSrc={chanceEncounterDefinition.imageSrc(this.state)}
          description={chanceEncounterDefinition.description(this.state)}
          acceptText={chanceEncounterDefinition.acceptText(this.state)}
          rejectText={chanceEncounterDefinition.rejectText(this.state)}
          onAccept={this.onAcceptChanceEncounter}
          onReject={this.onRejectChanceEncounter}
          acceptDisabled={chanceEncounterDefinition.acceptDisabled(this.state)}
          acceptDisabledText={chanceEncounterDefinition.acceptDisabledText(this.state)}
          rejectDisabled={chanceEncounterDefinition.rejectDisabled(this.state)}
        />
      );
    }

    if (selectedTabId === 'bank') {
      return (
        <React.Fragment>
          <Row>
            <TabMenu onTabSelected={this.onTabSelected} selectedTabId={selectedTabId} />
          </Row>
          <Bank
            borrowLimit={Math.max(10, cash * 0.1)}
            onBorrow={this.onBorrow}
            onSubmit={this.onPayoffDebt}
            onCancel={this.onCancelPayoff}
            debt={debt}
            interestRate={interestRate}
            cash={cash}
          />
        </React.Fragment>
      );
    }

    if (priceSplitNews) {
      return (
        <Row>
          <Col width={12}>
            <h1>Breaking news</h1>
            <h2>{priceSplitNews['title']}</h2>

            <Image src={priceSplitNews['imageSrc']} width="100%" height="10rem" />

            <Button onClick={this.onDismissNews}>Continue</Button>
          </Col>
        </Row>
      );
    }

    if (menuScreen === 'transaction') {
      const transactionItem = items.find((item) => item.id === transactionItemId);
      return (
        <Transact
          pouchLimit={this.state.itemPouch}
          pouchSpace={this.state.itemPouch - this.getItemSpaceUsed()}
          item={transactionItem}
          transactionType={transactionType}
          availableCash={this.state.cash}
          onCancel={this.onCancelTransaction}
          onTransact={this.onTransact}
          quantityOwned={this.state.itemsOwned[transactionItem.id]}
        />
      );
    }

    let totalPurchasableItems = 0;
    let totalSharesOwned = 0;

    const visibleItems = items.filter((item) => {
      const isPurchasable = item.value <= cash;
      const sharesOwned = this.state.itemsOwned[item.id];
      totalPurchasableItems += isPurchasable ? 1 : 0;
      totalSharesOwned += sharesOwned ? sharesOwned : 0;
      return isPurchasable || sharesOwned || item.visibleInitially;
    });
    
    const hiddenItems = items.length - visibleItems.length;

    const purchasableItems = (
      <React.Fragment>
        <Row>
          <Col width="5">
            <strong>Item</strong>
          </Col>
          <Col width="3">
            <strong>Value</strong>
          </Col>
          {/*
          <Col width="3">
            <strong>Shares</strong>
          </Col>
          */}
          <Col width="4">&nbsp;</Col>
        </Row>

        {visibleItems.map((item) => (
          <PurchasableItem
            {...item}
            quantity={this.state.itemsOwned[item.id] || 0}
            key={item.id}
            onBuyPressed={this.onBuyItem}
            onSellPressed={this.onSellItem}
            buyDisabled={item.value > this.state.cash}
            sellDisabled={!this.state.itemsOwned[item.id]}
          />
        ))}

        {hiddenItems > 0 && (
          <Row>
            <Notice warning>
              Increase your net worth to unlock {hiddenItems} other items
            </Notice>
          </Row>
        )}
      </React.Fragment>
    );

    const nextPouch = this.getNextPouchSpecs();

    return (
      <main>
        <Spacing bottom={1}>
          {/* TODO: Profile bar */}
          <ProfileBar
            onPressQuit={this.onPressQuit}
            player={this.getCurrentPlayer()}
            cash={cash}
            debt={debt}
            age={this.state.age}
            pouchSpaceUsed={this.getItemSpaceUsed()}
            pouchLimit={this.state.itemPouch}
          />
        </Spacing>

        <PageWidthContainer>
          <Spacing bottom={1}>
            <Row>
              <Col width={12}>
                {totalPurchasableItems === 0 && (
                  <Notice danger>
                    You don't have enough cash to buy anything. 
                    {totalSharesOwned > 0 && (
                      <React.Fragment>
                        &nbsp;Sell shares or <a href="#" style={{ color: '#eee'}} onClick={() => {
                          this.setState({
                            selectedTabId: 'bank'
                          });
                        }}>visit the bank</a> to borrow money.
                      </React.Fragment>
                    )}
                    {totalSharesOwned === 0 && (
                      <React.Fragment>
                        &nbsp;<a href="#" style={{ color: '#eee'}} onClick={() => {
                          this.setState({
                            selectedTabId: 'bank'
                          });
                        }}>Visit the bank</a> to borrow money.
                      </React.Fragment>
                    )}
                  </Notice>
                )}
                {totalPurchasableItems > 0 && nextPouch && (
                  <Button onClick={this.upgradePouch} disabled={cash < nextPouch.nextPouchCost}>
                    Upgrade item pouch for <Currency n={nextPouch.nextPouchCost} />
                  </Button>
                )}
                {totalPurchasableItems > 0 && !nextPouch && (
                  <React.Fragment>
                    <Button disabled>Pouch fully upgraded</Button>
                  </React.Fragment>
                )}

                <Help>
                  You can purchase up to <Currency n={this.state.itemPouch} hidePrefix /> items in
                  total right now. Upgrade your pouch to increase how many items you can carry.
                </Help>
              </Col>
            </Row>
          </Spacing>

          {selectedTabId === 'travel' && (
            <Travel onCitySelected={this.onCitySelected} availableCash={this.state.cash} />
          )}
          {selectedTabId === 'spend' && purchasableItems}
        </PageWidthContainer>

        <TabMenu onTabSelected={this.onTabSelected} selectedTabId={selectedTabId} />
      </main>
    );
  }
}

BasePage.propTypes = {
  routeId: PropTypes.string.isRequired,
};

export default withGameDatabase(BasePage, ['player']);
