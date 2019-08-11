import React from 'react';
import TabMenu from './pages/BasePage/TabMenu';
import Bank from './pages/BasePage/Bank';
import { Redirect } from 'react-router';
import { withGameDatabase } from './pages/BasePage/withDatabase';

class BankContainer extends React.Component {
  onBorrow = (amount) => {
    const { player } = this.props.databaseValues;
    this.props.setItem('player', {
      ...player,
      cash: player.cash + amount,
      debt: player.debt + amount
    });
    this.props.history.push('/spend');
  };

  // TODO: Should be called onSubmitPayoffDebt
  onSubmit = (amountToPayOff) => {
    const { player } = this.props.databaseValues;
    this.props.setItem('player', {
      ...player,
      cash: player.cash - amountToPayOff,
      debt: player.debt - amountToPayOff
    });
    this.props.history.push('/spend');
  };
  
  onCancel = () => {
    this.props.history.push('/spend');
  };

  render() {
    // TODO: This should fluctuate
    const interestRate = .15;
    const { player } = this.props.databaseValues;

    if (!player) {
      return <Redirect to="/player" />;
    }

    return (
      <React.Fragment>
          <Bank
            borrowLimit={Math.max(10, player.cash * 0.1)}
            onBorrow={this.onBorrow}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            debt={player.debt}
            interestRate={interestRate}
            cash={player.cash}
          />
          <TabMenu />
      </React.Fragment>
    )
  }
}

export default withGameDatabase(BankContainer, ['player']);