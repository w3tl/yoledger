import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExpenseForm from '../src/components/Expense/ExpenseForm';
import ExpenseList from '../src/components/Expense/ExpenseList';
import expenses from '../src/components/Expense/mockData';

storiesOf('Expense/Form', module)
  .add('creating new', () => <ExpenseForm onSave={action('onSave')} />)
  .add('filled', () => <ExpenseForm expense={{ ...expenses[0], id: null }} onSave={action('onSave')} />)
  .add('editing', () => <ExpenseForm expense={expenses[0]} onSave={action('onSave')} />)
  .add('loading', () => <ExpenseForm loading />)
  .add('with errors', () => <ExpenseForm error={{ graphQLErrors: ['Wrong account name!'] }} />);

storiesOf('Expense/List', module)
  .add('with data', () => <ExpenseList expenses={expenses} />)
  .add('empty list', () => <ExpenseList />);
