import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { incomePropType } from './propTypes';

function IncomeListItem({ url, income }) {
  const { id, name } = income;
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

IncomeListItem.propTypes = {
  url: PropTypes.string,
  income: incomePropType.isRequired,
};

IncomeListItem.defaultProps = {
  url: null,
};

export default IncomeListItem;
