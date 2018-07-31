import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { transactionPropType } from './propTypes';
import { Button } from '../Elements';

function TransactionListItem({ url, transaction }) {
  const {
    id, amount, source, destination,
  } = transaction;
  return (
    <li key={id} style={{ display: 'flex' }}>
      <p><b>From:</b> {source.name}</p>
      <p><b>; To:</b> {destination.name}</p>
      <p><b>; Amount:</b> {amount} </p>
      <Button>
        {url ? (
          <Link to={{ pathname: `${url}/view`, state: { id } }}>Edit</Link>
        ) : (
          'Edit'
        )}
      </Button>
    </li>
  );
}

TransactionListItem.propTypes = {
  url: PropTypes.string,
  transaction: transactionPropType.isRequired,
};

TransactionListItem.defaultProps = {
  url: null,
};

export default TransactionListItem;
