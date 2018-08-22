import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Select } from '../src/components/Elements';

const options = [{
  value: 'value1', label: 'Value 1',
}, {
  value: 'value2', label: 'Value 2',
}, {
  value: 'value3', label: 'Value 3',
}];

storiesOf('Elements/Select', module)
  .add('default', () => <Select options={options} onChange={action('onChange')} />)
  .add('with label', () => <Select options={options} label="Choose one" />);
