import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { expensePropType } from './propTypes';

function ExpenseListItem({ url, expense }) {
  const { id, name } = expense;
  return (
    <li key={name}>
      {url ? (
        <Link to={{ pathname: `${url}/view`, state: { id } }}>{name}</Link>
      ) : (
        name
      )}
    </li>
  );
}

ExpenseListItem.propTypes = {
  url: PropTypes.string,
  expense: expensePropType.isRequired,
};

ExpenseListItem.defaultProps = {
  url: null,
};

export default ExpenseListItem;
