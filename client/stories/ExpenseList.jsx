import React from 'react';
import { storiesOf } from '@storybook/react';

import ExpenseList from '../src/components/Expense/ExpenseList';
import expenses from '../src/components/Expense/mockData';

storiesOf('Expense/List', module)
  .add('with data', () => <ExpenseList expenses={expenses} />)
  .add('empty list', () => <ExpenseList />);
