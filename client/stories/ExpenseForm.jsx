import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExpenseForm from '../src/components/Expense/ExpenseForm';
import expenses from '../src/components/Expense/mockData';

storiesOf('Expense/Form', module)
  .add('create', () => <ExpenseForm onSave={action('onSave')} />)
  .add('edit', () => <ExpenseForm expense={expenses[0]} onSave={action('onSave')} />);
