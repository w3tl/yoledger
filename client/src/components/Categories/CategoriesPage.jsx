import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import {
  expensePropType, incomePropType, loadingPropType, errorPropType,
} from './propTypes';
import CategoriesList from './CategoriesList';
import CategoriesForm from './CategoriesForm';

function CategoriesPage({
  loading, error, onCreate, expenses, incomes, defaultActiveIndex,
}) {
  const panes = [{
    menuItem: 'Expenses', // eslint-disable-next-line react/prop-types
    render: () => (
      <Tab.Pane loading={loading.query}><CategoriesList categories={expenses} /></Tab.Pane>),
  }, {
    menuItem: 'Incomes', // eslint-disable-next-line react/prop-types
    render: () => (
      <Tab.Pane loading={loading.query}><CategoriesList categories={incomes} /></Tab.Pane>),
  }, {
    menuItem: 'Add new', // eslint-disable-next-line react/prop-types
    render: () => (
      <Tab.Pane>
        <CategoriesForm loading={loading.mutation} error={error.mutation} onCreate={onCreate} />
      </Tab.Pane>),
  }];

  return (
    <div>
      <Tab panes={panes} defaultActiveIndex={defaultActiveIndex} />
    </div>
  );
}

CategoriesPage.propTypes = {
  onCreate: PropTypes.func,
  loading: loadingPropType,
  error: errorPropType,
  expenses: PropTypes.arrayOf(expensePropType),
  incomes: PropTypes.arrayOf(incomePropType),
  defaultActiveIndex: PropTypes.number,
};

CategoriesPage.defaultProps = {
  onCreate: () => {},
  loading: {},
  error: {},
  expenses: [],
  incomes: [],
  defaultActiveIndex: 0,
};

export default CategoriesPage;
