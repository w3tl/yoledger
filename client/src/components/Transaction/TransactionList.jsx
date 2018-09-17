import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import TransactionListItem from './TransactionListItem';
import { transactionPropType } from './propTypes';

function TransactionList({ transactions, ...other }) {
  return (
    <List celled>
      {transactions.map(trans => (
        <TransactionListItem key={trans.id} transaction={trans} {...other} />))}
    </List>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(transactionPropType),
};

TransactionList.defaultProps = {
  transactions: [],
};

export default TransactionList;
