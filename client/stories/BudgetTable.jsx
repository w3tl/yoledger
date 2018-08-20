import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BudgetTable from '../src/components/Budget/BudgetTable';
import { BudgetTableColumnComponent } from '../src/components/Budget/BudgetTableColumn';
import { BudgetTableBodyComponent } from '../src/components/Budget/BudgetTableBody';
import BudgetCell from '../src/components/Budget/BudgetCell';
import { accounts, periods, budgets } from '../src/components/Budget/mockData';

storiesOf('Budget/Cell', module)
  .add('empty', () => <BudgetCell onUpdate={action('onUpdate')} />)
  .add('with value', () => <BudgetCell amount={404} onUpdate={action('onUpdate')} />);

const ColumnWithProps = props => (
  <BudgetTableColumnComponent {...props} accounts={accounts} budget={budgets[0]} onUpdate={() => action('onUpdate')} />
);

const BodyWithProps = () => (
  <BudgetTableBodyComponent
    Component={ColumnWithProps}
    accounts={accounts}
    periods={periods}
    onCreate={action('onCreate')}
    onPeriodChange={action('onPeriodChange')}
  />
);

storiesOf('Budget/Table', module)
  .add('with budget', () => <BudgetTable body={BodyWithProps} />);
