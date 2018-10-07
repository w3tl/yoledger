import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import { categoryPropType } from './propTypes';

function CategoriesListItem({ category }) {
  return (
    <List.Item>
      <List.Header>{category.name}</List.Header>
    </List.Item>
  );
}

CategoriesListItem.propTypes = {
  category: categoryPropType.isRequired,
};

function CategoriesList({ categories }) {
  return (
    <List>
      {categories.length === 0 && (
        <Header as="h2" disabled>Empty</Header>)}
      {categories.map(category => <CategoriesListItem key={category.id} category={category} />)}
    </List>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(categoryPropType),
};

CategoriesList.defaultProps = {
  categories: [],
};

export default CategoriesList;
