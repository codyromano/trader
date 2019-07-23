import React from 'react';
import PlainButton from './PlainButton';
import { Row, Col } from './Grid';
import Currency from './Currency';
import RangeWithPreview from './RangeWithPreview';

const listItemStyle = {
  display: 'block'
};

const tabStyleDefault = {
  color: 'blue'
};
const tabStyleSelected = {
  fontWeight: 'bold',
  borderBottom: 'solid #000 0.1rem!important'
};

export default class Bank extends React.Component {
  static BORROW = 1;
  static PAY_DEBT = 2;

  state = {
    value: 0,
    amountToPayOff: 0,
    bankTab: Bank.PAY_DEBT
  };

  updatePayoffAmount = ({ target: { value }}) => {
    this.setState({
      amountToPayOff: parseInt(value, 10)
    })
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.amountToPayOff);
  };

  updateValue = (event) => {
    this.setState({
      value: parseInt(event.target.value)
    })
  };

  onBorrow = () => {
    this.props.onBorrow(this.state.value);
  };

  renderBorrowTab = () => {
    const { value } = this.state;
    const { borrowLimit, interestRate } = this.props;

    return (
      <React.Fragment>
        <h1>Borrow</h1>

        <Row>
          You can borrow up to &nbsp;<Currency n={borrowLimit} />.
        </Row>

        <Row>
          <RangeWithPreview step={Math.min(borrowLimit, 5)} isCurrency={true} onChange={this.updateValue} min={0} max={borrowLimit} value={value} />
        </Row>

        {value > 0 && (
          <div style={{color: 'red'}}>
            Note: Interest accumulates every time you travel
          </div>
        )}

        <Row>
          <button onClick={this.props.onCancel}>Cancel</button>
          {value === 0 && <button disabled={true}>Borrow</button>}
          {value > 0 && <button onClick={this.onBorrow}>Borrow <Currency n={value} /> with %{interestRate} interest</button>}
        </Row>

      </React.Fragment>
    )
  };

  renderPayDebtTab = () => {
    const { amountToPayOff } = this.state;
    const { debt, interestRate, cash } = this.props;

    return (
      <React.Fragment>
        <h1>Pay off debt</h1>
        {debt > 0 && <table border={1} padding={5}>
          <tbody>
          <tr>
            <th>Outstanding Balance</th>
            <td>${debt}</td>
          </tr>
          <tr>
            <th>Interest Rate</th>
            <td>%{interestRate * 100}</td>
          </tr>
          <tr>
            <th>Available cash</th>
            <td><Currency n={cash} /></td>
          </tr>
          </tbody>
        </table>}

        {debt === 0 && <p>
          You have no debt. 🙂
        </p>}

        <br/>

        {cash > 0 && debt > 0 && (   
          <React.Fragment>     
            <RangeWithPreview
              isCurrency={true}
              onChange={this.updatePayoffAmount}
              value={amountToPayOff}
              min={0}
              max={Math.min(cash, debt)}
            />

            <br/>
            <button onClick={this.props.onCancel}>Cancel</button>
            {amountToPayOff > 0 && (
              <button onClick={this.onSubmit}>Pay ${amountToPayOff}</button>
            )}
          </React.Fragment>
        )}
        {cash === 0 && debt > 0 && (
          <p style={{color: 'red'}}>
            You can't afford to pay off debt right now. 😞 Trade stocks or borrow from the bank
            to earn extra cash.
          </p>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { amountToPayOff, bankTab } = this.state;
    const { debt, interestRate, cash } = this.props;

    return (
      <Row>
        <Col width={4}>
          <ul>
            <li style={Bank.listItemStyle}>
              <PlainButton onClick={() => {
                this.setState({
                  bankTab: Bank.PAY_DEBT
                })
              }}>Pay debt</PlainButton>
            </li>
            <li style={Bank.listItemStyle}>
              <PlainButton onClick={() => {
                  this.setState({
                    bankTab: Bank.BORROW
                  })
                }}>Borrow</PlainButton>
            </li>
          </ul>
        </Col>
        <Col width={8}>
          {bankTab === Bank.PAY_DEBT && this.renderPayDebtTab()}
          {bankTab === Bank.BORROW && this.renderBorrowTab()}
        </Col>
      </Row>
    );
  }
}
