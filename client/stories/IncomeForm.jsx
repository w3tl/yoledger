import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IncomeForm from '../src/components/Income/IncomeForm';
import incomes from '../src/components/Income/mockData';

storiesOf('Income/Form', module)
  .add('create', () => <IncomeForm onSave={action('onSave')} />)
  .add('edit', () => <IncomeForm income={incomes[0]} onSave={action('onSave')} />);
