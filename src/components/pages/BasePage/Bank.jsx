import React from 'react';

export default class Bank extends React.Component {
  state = {
    amountToPayOff: 0,
  };

  updatePayoffAmount = ({ target: { value }}) => {
    this.setState({
      amountToPayOff: parseInt(value, 10)
    })
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.amountToPayOff);
  };

  render() {
    const { amountToPayOff } = this.state;
    const { debt, interestRate, cash } = this.props;

    return (
      <div>
        <h1>Pay off debt</h1>
        <table border={1}>
          <tbody>
          <tr>
            <th>Outstanding Balance</th>
            <td>${debt}</td>
          </tr>
          <tr>
            <th>Interest Rate</th>
            <td>${interestRate}</td>
          </tr>
          <tr>
            <th>Available cash</th>
            <td>${cash}</td>
          </tr>
          </tbody>
        </table>
        <br/>
        <input step="5" type="range" onChange={this.updatePayoffAmount} value={amountToPayOff} min={0} max={Math.min(cash, debt)} />
        &nbsp; ${amountToPayOff}

        <br/>
        <button onClick={this.props.onCancel}>Cancel</button>
        {amountToPayOff > 0 && (
          <button onClick={this.onSubmit}>Pay ${amountToPayOff}</button>
        )}
      </div>
    );
  }
}
