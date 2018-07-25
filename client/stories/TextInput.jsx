import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextInput } from '../src/components/Elements';

storiesOf('Elements/TextInput', module)
  .add('default', () => <TextInput />)
  .add('with label', () => <TextInput label="Input here" />)
  .add('with value', () => <TextInput value={10} onChange={action('Value changed')} />);
