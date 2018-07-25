import React from 'react';
import PropTypes from 'prop-types';
import BudgetCell from './BudgetCell';
import { accountPropType, budgetPropType } from '../propTypes';

class BudgetRow extends React.Component {
  static propTypes = {
    account: accountPropType.isRequired,
    budgets: PropTypes.arrayOf(budgetPropType),
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  handleUpdate = period => ({ amount }) => {
    const { onUpdate, account } = this.props;
    onUpdate({ account, period, amount });
  }

  handleDelete = period => () => {
    const { onDelete, account } = this.props;
    onDelete({ account, period });
  }

  render() {
    const { account, budgets } = this.props;

    return (
      <tr>
        <td>{account.name}</td>
        {budgets.map(budget => (
          <td key={`${account.name}_${budget.period.dateStart}`}>
            <BudgetCell
              amount={budget.amount}
              onUpdate={this.handleUpdate(budget.period)}
              onDelete={this.handleDelete(budget.period)}
            />
          </td>
        ))}
      </tr>
    );
  }
}

BudgetRow.defaultProps = {
  budgets: [],
};

export default BudgetRow;
