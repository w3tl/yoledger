import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BudgetTable from '../src/components/Budget/BudgetTable';
import BudgetTableRow from '../src/components/Budget/BudgetTableRow';
import { BudgetTableHeaderComponent } from '../src/components/Budget/BudgetTableHeader';
import { BudgetTableBodyComponent } from '../src/components/Budget/BudgetTableBody';
import BudgetCell from '../src/components/Budget/BudgetCell';
import { periods, accounts } from '../src/components/Budget/mockData';

storiesOf('Budget/Cell', module)
  .add('empty', () => <BudgetCell onUpdate={action('onUpdate')} />)
  .add('with value', () => <BudgetCell amount={404} onUpdate={action('onUpdate')} />);

storiesOf('Budget/TableRow', module)
  .add('with value', () => (<BudgetTableRow budget={accounts[0]} onUpdate={action('onUpdate')} />));

const HeaderWithProps = () => (
  <BudgetTableHeaderComponent periods={periods} onNext={action('onNext')} />
);

const BodyWithProps = () => (
  <BudgetTableBodyComponent accounts={accounts} />
);

storiesOf('Budget/Table', module)
  .add('with budget', () => <BudgetTable header={HeaderWithProps} body={BodyWithProps} />);
