import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { incomePropType } from './propTypes';

function IncomeListItem({ url, income }) {
  const { id, name } = income;
  return (
    <List.Item>
      <List.Icon name="money" />
      <List.Content verticalAlign="bottom">
        <Link to={{ pathname: `${url}/view`, state: { id } }}>{name}</Link>
      </List.Content>
    </List.Item>
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
