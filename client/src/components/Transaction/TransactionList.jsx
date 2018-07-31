import React from 'react';
import PropTypes from 'prop-types';
import TransactionListItem from './TransactionListItem';
import { transactionPropType } from './propTypes';

function TransactionList({ transactions, match }) {
  return (
    <ul>
      {transactions.map(trans => (
        <TransactionListItem key={trans.id} url={match.url} transaction={trans} />))}
    </ul>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(transactionPropType),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

TransactionList.defaultProps = {
  match: {
    url: '',
  },
  transactions: [],
};

export default TransactionList;
