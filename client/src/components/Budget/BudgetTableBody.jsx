import React from 'react';
import PropTypes from 'prop-types';
import { accountPropType } from '../propTypes';
import BudgetTableColumn from './BudgetTableColumn';
import withData from './BudgetTableBodyHOC';
import { AccountInput } from '../Account';
import { Button } from '../Elements';

class BudgetTableBody extends React.Component {
  static propTypes = {
    Component: PropTypes.func,
    accounts: PropTypes.arrayOf(accountPropType),
    periods: PropTypes.arrayOf(PropTypes.string),
    onCreate: PropTypes.func,
    onPeriodChange: PropTypes.func,
  }

  static defaultProps = {
    Component: BudgetTableColumn,
    accounts: [],
    periods: [],
    onCreate: () => {},
    onPeriodChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { newAccount: '' };
  }

  handlePeriodChange = sign => () => {
    const { onPeriodChange, periods } = this.props;
    if (sign > 0) {
      onPeriodChange(periods[1]);
    } else {
      const firstDate = new Date(periods[0]);
      firstDate.setDate(firstDate.getDate() - 1);
      onPeriodChange(firstDate.toISOString());
    }
  }

  handleNewAccountChange = (event) => {
    this.setState({ newAccount: event.target.value });
  }

  handleAdd = () => {
    const { newAccount: account } = this.state;
    const { periods, accounts, onCreate } = this.props;
    const existBudget = accounts.find(({ name }) => name === account);
    if (!existBudget) {
      onCreate({
        variables: {
          input: {
            date: periods[0] || new Date().toISOString(),
            account,
            amount: 0,
          },
        },
      });
    }
  }

  render() {
    const { newAccount = '' } = this.state;
    const { Component, accounts, periods } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ height: 30 }}>
            <Button id="prevButton" onClick={this.handlePeriodChange(-1)}>Prev</Button>
            <Button id="nextButton" onClick={this.handlePeriodChange(1)}>Next</Button>
          </div>
          {accounts.map(({ name }) => (
            <div style={{ height: 30 }} key={name}>{name}</div>
          ))}
          <div style={{ height: 30 }}>
            <AccountInput value={newAccount} onChange={this.handleNewAccountChange} />
            <Button disabled={newAccount.length === 0} id="add" onClick={this.handleAdd}>add</Button>
          </div>
        </div>
        {periods.map(date => (
          <Component key={date} accounts={accounts} date={date} />
        ))}
      </div>
    );
  }
}

export { BudgetTableBody as BudgetTableBodyComponent };
export default withData(BudgetTableBody);
