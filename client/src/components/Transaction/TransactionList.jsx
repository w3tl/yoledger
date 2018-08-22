import React from 'react';
import PropTypes from 'prop-types';
import TransactionListItem from './TransactionListItem';
import { transactionPropType } from './propTypes';

function TransactionList({ transactions, ...other }) {
  return (
    <ul>
      {transactions.map(trans => (
        <TransactionListItem key={trans.id} transaction={trans} {...other} />))}
    </ul>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(transactionPropType),
};

TransactionList.defaultProps = {
  transactions: [],
};

export default TransactionList;
