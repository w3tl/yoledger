import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AccountInput } from '../src/components';

storiesOf('AccountInput', module)
  .add('default', () => <AccountInput />)
  .add('with label', () => <AccountInput label="Enter account" />)
  .add('with value', () => <AccountInput value="Food" onChange={action('onChange')} />);
