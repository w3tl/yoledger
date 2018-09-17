import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { expensePropType } from './propTypes';

function ExpenseListItem({ url, expense }) {
  const { id, name } = expense;
  return (
    <List.Item>
      <List.Icon name="shopping bag" />
      <List.Content verticalAlign="bottom">
        <Link to={{ pathname: `${url}/view`, state: { id } }}>{name}</Link>
      </List.Content>
    </List.Item>
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
