import React from 'react';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import { expensePropType } from './propTypes';

function ExpenseList({ expenses, match }) {
  return (
    <ul>
      {expenses.map(account => (
        <ExpenseListItem key={account.name} url={match.url} expense={account} />))}
    </ul>
  );
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(expensePropType),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

ExpenseList.defaultProps = {
  match: {
    url: '',
  },
  expenses: [],
};

export default ExpenseList;
