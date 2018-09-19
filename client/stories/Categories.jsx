import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CategoriesPage from '../src/components/Categories/CategoriesPage';
import { incomes, expenses } from '../src/components/Categories/mockData';

const PageList = props => (
  <CategoriesPage incomes={incomes} expenses={expenses} {...props} />);

const PageForm = props => (
  <CategoriesPage defaultActiveIndex={2} onCreate={action('onCreate')} {...props} />);

const error = { graphQLErrors: [{ message: 'Account already exists!' }] };

storiesOf('Categories/Page', module)
  .add('default', () => <PageList />)
  .add('empty', () => <PageList expenses={[]} incomes={[]} />)
  .add('income tab', () => <PageList defaultActiveIndex={1} />)
  .add('add tab', () => <PageForm />)
  .add('loading query', () => <PageList loading={{ query: true }} />)
  .add('loading mutation', () => <PageForm loading={{ mutation: true }} />)
  .add('with query error', () => <PageList error={{ query: error }} />)
  .add('with mutation error', () => <PageForm error={{ mutation: error }} />);
