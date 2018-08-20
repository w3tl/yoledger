import React from 'react';
import PropTypes from 'prop-types';
import IncomeListItem from './IncomeListItem';
import { incomePropType } from './propTypes';

function IncomeList({ incomes, match }) {
  return (
    <ul>
      {incomes.map(account => (
        <IncomeListItem key={account.name} url={match.url} income={account} />))}
    </ul>
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
