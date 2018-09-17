import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import ExpenseListItem from './ExpenseListItem';
import { expensePropType } from './propTypes';

function ExpenseList({ expenses, match }) {
  return (
    <List>
      {expenses.length === 0 && (
        <Header as="h2" disabled>Empty</Header>)}
      {expenses.map(account => (
        <ExpenseListItem key={account.name} url={match.url} expense={account} />))}
    </List>
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
