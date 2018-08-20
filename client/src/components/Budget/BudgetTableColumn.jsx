import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BudgetCell from './BudgetCell';
import { budgetPropType } from './propTypes';
import { accountPropType } from '../propTypes';
import withData from './BudgetTableColumnHOC';

function BudgetTableColumn({
  date, accounts, budget, onUpdate,
}) {
  return (
    <div>
      <div style={{ height: 30 }}>
        {moment(date).format('D MMM')}
      </div>
      {accounts.map(({ name }) => {
        const allocation = budget.find(b => b.account.name === name) || { amount: 0 };
        return (
          <BudgetCell key={`${date}_${name}`} amount={allocation.amount} onUpdate={onUpdate({ date, account: name })} />
        );
      })}
    </div>
  );
}

BudgetTableColumn.propTypes = {
  date: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(accountPropType),
  budget: PropTypes.arrayOf(budgetPropType),
  onUpdate: PropTypes.func,
};

BudgetTableColumn.defaultProps = {
  accounts: [],
  budget: [],
  onUpdate: () => () => {},
};

export { BudgetTableColumn as BudgetTableColumnComponent };
export default withData(BudgetTableColumn);
