import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DateInput } from '../src/components/Elements';

storiesOf('Elements/DateInput', module)
  .add('default', () => <DateInput />)
  .add('with label', () => <DateInput label="Input here" />)
  .add('with value', () => <DateInput value="2018-01-02" onChange={action('Value changed')} />);
