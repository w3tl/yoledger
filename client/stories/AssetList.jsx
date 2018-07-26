import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AssetList from '../src/components/AssetList';

const accounts = [{
  name: 'Bank Card',
}, {
  name: 'Cash',
}, {
  name: 'Bank Card 2',
}];

storiesOf('Asset/List', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('with data', () => <AssetList assets={accounts} />);
