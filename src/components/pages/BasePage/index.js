import React from 'react';
import PropTypes from 'prop-types';
import TabMenu, { tabs } from './TabMenu';
import Transact from './Transact';
import Bank from './Bank';
import { Row, Col, PageWidthContainer } from './Grid';
import Currency from './Currency';
import Notice from './Notice';
import Travel from './Travel';
import Image from './Image';
import NetWorth from './NetWorth';
import Spacing from './Spacing';
import ProfileBar from './ProfileBar';
import ChanceEncounter from './ChanceEncounter';
import chanceEncounters from './chanceEncounters.jsx';
import Help from './Help';
import './BasePage.css';
import { itemPouches, purchasableItems, MILLION, STARTING_CASH, STARTING_DEBT, TRAVEL_COST } from './constants';

const CITIES = [
  {
    id: 'sea',
    name: 'Seattle',
  },
  {
    id: 'nyc',
    name: 'New York',
  },
  {
    id: 'mia',
    name: 'Miami'
  }
];

class CityMenu extends React.PureComponent {
  render() {
    const { currentCityId, cities, onChange } = this.props;
      return <ul>
        {cities.map(city => (
          <li><button onClick={() => onChange(city)} disabled={city.id === currentCityId}>{city.name}</button></li>
        ))}
      </ul>;
  }
}

const random = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

class PurchasableItem extends React.PureComponent {
  render() {
    const { imageSrc, value, buyDisabled, sellDisabled, quantity, onBuyPressed, onSellPressed } = this.props;
    return (
      <Row>
        <Col width="3">
          <Image height="1rem" width="1rem" src={imageSrc} />
          &nbsp;
          {this.props.title}
        </Col>
        <Col width="3">
          <Currency n={value} />
        </Col>
        <Col width="3">
          {quantity}
        </Col>
        <Col width="3">
          <button onClick={() => onBuyPressed(this.props)} disabled={buyDisabled}>Buy</button>
          {!sellDisabled && <button onClick={() => onSellPressed(this.props)}>Sell</button> }
        </Col>
      </Row>
    );
  }
}

export default class BasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      chanceEncounter: null,
      cash: STARTING_CASH,
      debt: STARTING_DEBT,
      interestRate: 0.15,
      itemPouch: 25,
      currentCityId: 'sea',
      selectedTabId: tabs[0].id,
      menuScreen: null,
      itemsOwned: {},
      items: purchasableItems.map(item => {
        item.value = item.min + Math.random() * (item.max - item.min);
        return item;
      }),
    }
  };

  getItemSpaceUsed = () => {
    return Object.values(this.state.itemsOwned).reduce((total, quantity) => total + quantity, 0);
  };
  
  onCityChange = (city) => {
    if (this.state.cash >= TRAVEL_COST) {

      const shuffledEncounters = Object
        .keys(chanceEncounters)
        .sort((a, b) => Math.random() > 0.5 ? -1 : 1);
      
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
      }));
    }
  };

  onTabSelected = (tab) => {
    this.setState({
      selectedTabId: tab.id,
    })
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
    })
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
      const priceSwing = 0.50;
      const chanceOfPriceSwing = Math.random() <= .33;
      const evenSplitChance = Math.random() <= .50;

      let priceSplitNews = null;

      const items = state.items.map(item => {
        item.value = Math.round(
          item.min + ((item.max - item.min) * Math.random())
        );
        return item;
      });

      if (chanceOfPriceSwing) {
        const item = random(items);
        const multiplier = evenSplitChance ? 0.50 : 1.75;

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

      const shuffledEncounters = Object
      .keys(chanceEncounters)
      .sort((a, b) => Math.random() > 0.5 ? -1 : 1);
      
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
        chanceEncounter
      };
    });
  };

  onDismissNews = () => {
    this.setState({
      priceSplitNews: null,
    });
  };

  onPayoffDebt = (amount) => {
    this.setState(state => ({
      debt: state.debt - amount,
      cash: state.cash - amount,
      selectedTabId: 'spend'
    }));
  }

  onBorrow = (amount) => {
    this.setState(state => ({
      cash: state.cash + amount,
      debt: state.debt + amount,
      selectedTabId: 'spend',
    }));
  };
  
  onCancelPayoff = () => {
    this.setState({
      selectedTabId: 'spend'
    })
  };

  getNextPouchSpecs = () => {
    const item = itemPouches.find(pouch => pouch.amount > this.state.itemPouch);
    return {
      nextPouchAmount: item.amount,
      nextPouchCost: item.cost
    }
  };

  onRejectChanceEncounter = () => {
    const newState = chanceEncounters[this.state.chanceEncounter].onReject(this.state);
    this.setState({
      ...newState,
      chanceEncounter: null
    });
  };

  upgradePouch = () => {
    const item = itemPouches.find(pouch => pouch.amount > this.state.itemPouch);
    this.setState(state => ({
      cash: state.cash - item.cost,
      itemPouch: item.amount,
    }));
  };

  onAcceptChanceEncounter = () => {
    const newState = chanceEncounters[this.state.chanceEncounter].onAccept(this.state);
    this.setState({
      ...newState,
      chanceEncounter: null
    });
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
      transactionItemId
    } = this.state;

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
            <TabMenu
              onTabSelected={this.onTabSelected}
              selectedTabId={selectedTabId}
            />
          </Row>
          <Bank
            borrowLimit={Math.max(10, cash * .10)}
            onBorrow={this.onBorrow}
            onSubmit={this.onPayoffDebt}
            onCancel={this.onCancelPayoff}
            debt={debt}
            interestRate={interestRate}
            cash={cash}
          />
        </React.Fragment>
      )
    }

    if (priceSplitNews) {
      return (
        <Row>
          <Col width={12}>
          <h1>Breaking news</h1>
          <h2>{priceSplitNews['title']}</h2>

          <Image src={priceSplitNews['imageSrc']} width="100%" height="10rem" />

          <button onClick={this.onDismissNews}>Continue</button>
          </Col>
        </Row>
      )
    }

    if (menuScreen === 'transaction') {
      const transactionItem = items.find(item => item.id === transactionItemId);
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

    const affordableItems = items
      .filter((item) => {
        return (
          item.value <= cash ||
          this.state.itemsOwned[item.id] ||
          item.visibleInitially
        );
      });
    const unaffordableItems = items.length - affordableItems.length;

    const purchasableItems = (
      <React.Fragment>
        <Row>
          <Col width="3">
            <strong>Item</strong>
          </Col>
          <Col width="3">
            <strong>Value</strong>
          </Col>
          <Col width="3">
            <strong>Shares</strong>
          </Col>
          <Col width="3">
            <strong>Actions</strong>
          </Col>
        </Row>

        {affordableItems.map(item => (
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

      {unaffordableItems > 0 && (
        <Row>
          <Notice warning>
            Increase your net worth to unlock {unaffordableItems} other items
          </Notice>
        </Row>
      )}
      </React.Fragment>
    );

    const { nextPouchAmount, nextPouchCost } = this.getNextPouchSpecs();


    return (
      <main>
        <Spacing bottom={1}>
          {/* TODO: Profile bar */ }
          {false && <ProfileBar />}
        </Spacing>

        <PageWidthContainer>
          <Spacing bottom={1}>
            <Row>
              <Col width={4}>
                <Spacing right={1}>
                <NetWorth cash={cash} debt={debt} />
                </Spacing>
              </Col>
              <Col width={8}>
                <strong>Item pouch</strong>&nbsp;
                <Currency n={this.getItemSpaceUsed()} hidePrefix /> / <Currency hidePrefix n={this.state.itemPouch} />
                <Help>
                  You can purchase up to <Currency n={this.state.itemPouch} hidePrefix /> items in total right now.
                  Upgrade your pouch to increase how many items you can buy.
                </Help>
                <br/>

                <button onClick={this.upgradePouch} disabled={cash < nextPouchCost}>
                  Upgrade pouch for <Currency n={nextPouchCost} />
                </button>
              </Col>
            </Row>
          </Spacing>

        {selectedTabId === 'travel' && (
          <Travel
            onCitySelected={this.onCitySelected}
            availableCash={this.state.cash}
          />
        )}
        {selectedTabId === 'spend' && purchasableItems}
       </PageWidthContainer>


          <TabMenu
            onTabSelected={this.onTabSelected}
            selectedTabId={selectedTabId}
          />
      </main>
    );
  }
}

BasePage.propTypes = {
  routeId: PropTypes.string.isRequired
};
