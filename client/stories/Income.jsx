import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IncomeForm from '../src/components/Income/IncomeForm';
import IncomeList from '../src/components/Income/IncomeList';
import incomes from '../src/components/Income/mockData';

storiesOf('Income/Form', module)
  .add('creating new', () => <IncomeForm onSave={action('onSave')} />)
  .add('filled', () => <IncomeForm income={{ ...incomes[0], id: null }} onSave={action('onSave')} />)
  .add('editing', () => <IncomeForm income={incomes[0]} onSave={action('onSave')} />)
  .add('loading', () => <IncomeForm loading />)
  .add('with errors', () => <IncomeForm error={{ graphQLErrors: ['Wrong account name!'] }} />);

storiesOf('Income/List', module)
  .add('with data', () => <IncomeList incomes={incomes} />)
  .add('empty list', () => <IncomeList />);
