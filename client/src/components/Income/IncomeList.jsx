import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import IncomeListItem from './IncomeListItem';
import { incomePropType } from './propTypes';

function IncomeList({ incomes, match }) {
  return (
    <List>
      {incomes.length === 0 && (
        <Header as="h2" disabled>Empty</Header>)}
      {incomes.map(account => (
        <IncomeListItem key={account.name} url={match.url} income={account} />))}
    </List>
  );
}

IncomeList.propTypes = {
  incomes: PropTypes.arrayOf(incomePropType),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

IncomeList.defaultProps = {
  match: {
    url: '',
  },
  incomes: [],
};

export default IncomeList;
