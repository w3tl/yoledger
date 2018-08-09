import React from 'react';
import PropTypes from 'prop-types';
import BudgetCell from './BudgetCell';
import { budgetPropType } from './propTypes';

class BudgetTableRow extends React.Component {
  static propTypes = {
    budget: budgetPropType.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleUpdate = date => ({ amount }) => {
    const { onChange } = this.props;
    onChange({ date, amount });
  }

  render() {
    const { budget: { account, allocations } } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1 100px' }}>{account.name}</div>
        {allocations.map(({ amount, date }) => (
          <BudgetCell
            key={`${account.name}_${date}`}
            amount={amount}
            onUpdate={this.handleUpdate(date)}
          />
        ))}
        <div style={{ flex: 1 }} />
      </div>
    );
  }
}

export default BudgetTableRow;
