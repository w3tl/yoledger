import React from 'react';
import { storiesOf } from '@storybook/react';

import AssetList from '../src/components/Asset/AssetList';

const assets = [{
  id: '1',
  name: 'Bank Card',
  balance: 0,
}, {
  id: '2',
  name: 'Cash',
  balance: 10,
}, {
  id: '3',
  name: 'Bank Card 2',
  balance: 150,
}];

storiesOf('Asset/List', module)
  .add('with data', () => <AssetList assets={assets} />)
  .add('empty list', () => <AssetList />);
