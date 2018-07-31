import React from 'react';
import { storiesOf } from '@storybook/react';

import TransactionList from '../src/components/Transaction/TransactionList';

const transactions = [{
  id: '1',
  amount: 10,
  source: { name: 'Cash' },
  destination: { name: 'Food' },
  date: new Date('2018-01-01').toString(),
}, {
  id: '2',
  amount: 10,
  source: { name: 'Cash' },
  destination: { name: 'Bank Card' },
  date: new Date('2018-04-01').toString(),
}, {
  id: '3',
  amount: 10,
  source: { name: 'Bank Card' },
  destination: { name: 'Food' },
  date: new Date('2018-01-10').toString(),
}];

storiesOf('Transaction/List', module)
  .add('with data', () => <TransactionList transactions={transactions} />)
  .add('empty list', () => <TransactionList />);
