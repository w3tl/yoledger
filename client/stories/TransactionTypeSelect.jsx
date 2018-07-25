import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TransactionTypeSelect } from '../src/components';

storiesOf('TransactionTypeSelect', module)
  .add('default', () => <TransactionTypeSelect />)
  .add('with label', () => <TransactionTypeSelect label="Select" />)
  .add('with value', () => <TransactionTypeSelect value="income" onChange={action('Value changed')} />);
