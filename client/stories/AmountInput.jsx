import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AmountInput } from '../src/components';

storiesOf('AmountInput', module)
  .add('default', () => <AmountInput />)
  .add('with label', () => <AmountInput label="Amount" />)
  .add('with value', () => <AmountInput value={10} onChange={action('onChange')} />);
