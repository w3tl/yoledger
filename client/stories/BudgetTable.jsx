import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BudgetTable, BudgetRow, BudgetCell } from '../src/components';

const accounts = [{
  name: 'Train',
}];

const budgets = [{
  id: '1',
  amount: 10,
  period: {
    dateStart: '2018-06-10',
  },
}, {
  id: '2',
  amount: 15,
  period: {
    dateStart: '2018-06-25',
  },
}, {
  id: '3',
  amount: 13,
  period: {
    dateStart: '2018-07-10',
  },
}];

const periods = [{
  dateStart: '2018-06-10',
}, {
  dateStart: '2018-06-25',
}, {
  dateStart: '2018-07-10',
}];

const TableDecorator = storyFn => (<table><tbody>{storyFn()}</tbody></table>);

storiesOf('Budget/Cell', module)
  .add('empty', () => <BudgetCell onUpdate={action('onUpdate')} />)
  .add('with value', () => <BudgetCell amount={404} onUpdate={action('onUpdate')} />);

storiesOf('Budget/Row', module)
  .addDecorator(TableDecorator)
  .add('with value', () => (
    <BudgetRow
      account={accounts[0]}
      budgets={budgets}
      onUpdate={action('onUpdate')}
      onDelete={action('onDelete')}
    />));

storiesOf('Budget/Table', module)
  .add('with value', () => (
    <BudgetTable
      periods={periods}
      onChange={action('onChange')}
    >
      {accounts.map(account => (
        <BudgetRow key={account.id} account={account} budgets={budgets} onUpdate={action('onUpdate')} />
      ))}
    </BudgetTable>));
