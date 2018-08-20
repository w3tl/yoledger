import React from 'react';
import { storiesOf } from '@storybook/react';

import IncomeList from '../src/components/Income/IncomeList';
import incomes from '../src/components/Income/mockData';

storiesOf('Income/List', module)
  .add('with data', () => <IncomeList incomes={incomes} />)
  .add('empty list', () => <IncomeList />);
