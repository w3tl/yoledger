import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TransactionForm } from '../src/components';

const transaction = {
  amount: 10,
  source: { name: 'Cash' },
  destination: { name: 'Food' },
  date: new Date('2018-01-01').toString(),
};

storiesOf('Transaction/Form', module)
  .add('default', () => <TransactionForm onSave={action('onSave')} />)
  .add('with value', () => <TransactionForm {...transaction} />);
